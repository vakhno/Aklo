import type { Socket } from "socket.io-client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { applyPeerRemoteAnswer } from "@/lib/peer/apply-peer-remote-answer";
import { applyPeerRemoteCandidate } from "@/lib/peer/apply-peer-remote-candidate";
import { createPeer } from "@/lib/peer/create-peer";
import { createPeerAnswer } from "@/lib/peer/create-peer-answer";
import { createPeerOffer } from "@/lib/peer/create-peer-offer";

export interface RemotePeer {
	socketId: string;
	stream: MediaStream;
	connection: RTCPeerConnection;
}

interface useRouletteWebRTCProps {
	rouletteId: string;
	localStream: MediaStream | null;
}

export function useRouletteWebRTC({ localStream, rouletteId }: useRouletteWebRTCProps) {
	const [isSearching, setSearching] = useState(false);
	const [isFound, setFound] = useState(false);
	const [remotePeer, setRemotePeer] = useState<RemotePeer | null>(null);

	const socketRef = useRef<Socket | null>(null);
	const peerRef = useRef<RTCPeerConnection | null>(null);

	const handleOnTrack = (targetSocketId: string) => {
		return (event: RTCTrackEvent, peer: RTCPeerConnection) => {
			setRemotePeer((prev) => {
				const remoteStream = prev?.stream || new MediaStream();

				if (!remoteStream.getTracks().find(track => track.id === event.track.id)) {
					remoteStream.addTrack(event.track);
				}

				return {
					socketId: targetSocketId,
					stream: remoteStream,
					connection: peer
				};
			});
		};
	};

	const handleOnIceCandidate = (partnerSocketId: string) => {
		return (event: RTCPeerConnectionIceEvent) => {
			if (event.candidate && socketRef.current) {
				socketRef.current.emit("roulette-send-ice-candidate", {
					candidate: event.candidate,
					partnerSocketId
				});
			}
		};
	};

	function closePeer() {
		if (peerRef.current) {
			peerRef.current.close();
			peerRef.current = null;
		}

		setRemotePeer(null);
	}

	function handleStartSearch() {
		if (socketRef.current && localStream) {
			const socket = socketRef.current;

			setSearching(true);

			socket.emit("roulette-start-search");
		}
	}

	function handlePauseSearch() {
		setSearching(false);

		if (socketRef.current) {
			socketRef.current.emit("roulette-pause");
		}
	}

	function handleStopSearch() {
		setFound(false);

		closePeer();

		const socket = socketRef.current;

		if (socket) {
			socket.emit("roulette-stop");
		}
	}

	function handleSkipOpponent() {
		setFound(false);
		setSearching(true);

		closePeer();

		const socket = socketRef.current;

		if (socket) {
			socket.emit("roulette-skip");
		}
	}

	function disconnectSocket() {
		if (socketRef.current) {
			socketRef.current?.disconnect();
		}
	}

	function initSocket() {
		if (!localStream) {
			return;
		}

		const socket = io(`${import.meta.env.VITE_SOCKET_URL}/roulette`, {
			transports: ["websocket"]
		});

		socket.on("connect", () => {
			socketRef.current = socket;

			socket.emit("roulette-join", { rouletteId });

			socket.on("roulette-left", () => {
				setSearching(true);
				setFound(false);

				closePeer();

				socket.emit("roulette-start-search-after-opponent-skip");
			});

			socket.on("roulette-detect", async ({ partnerSocketId, isInitiator }) => {
				const peer = createPeer({ stream: localStream, handleOnTrack: handleOnTrack(partnerSocketId), handleOnIceCandidate: handleOnIceCandidate(partnerSocketId) });

				peerRef.current = peer;

				if (isInitiator) {
					await createPeerOffer({ peer });

					if (socketRef.current) {
						socketRef.current.emit("roulette-send-offer", {
							offer: peer.localDescription,
							partnerSocketId
						});
					}
				}

				setSearching(false);
				setFound(true);
			});

			socket.on("roulette-skipped-by-partner", async () => {
				setSearching(true);
				setFound(false);

				closePeer();

				socket.emit("roulette-skipped");
			});

			socket.on("roulette-receive-offer", async ({ partnerSocketId, offer }: { partnerSocketId: string; offer: RTCSessionDescription }) => {
				const peer = createPeer({ stream: localStream, handleOnTrack: handleOnTrack(partnerSocketId), handleOnIceCandidate: handleOnIceCandidate(partnerSocketId) });

				peerRef.current = peer;

				const answer = await createPeerAnswer({ peer, offer });

				socket.emit("roulette-send-answer", {
					answer,
					partnerSocketId
				});
			});

			socket.on("roulette-receive-answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
				const peer = peerRef.current;

				if (peer) {
					await applyPeerRemoteAnswer({ peer, answer });
				}
			});

			socket.on("roulette-receive-ice-candidate", async ({ candidate }) => {
				const peer = peerRef.current;

				if (peer) {
					await applyPeerRemoteCandidate({ peer, candidate });
				}
			});
		});
	}

	useEffect(() => {
		return () => {
			disconnectSocket();
			closePeer();
		};
	}, []);

	return { remotePeer, isSearching, isFound, handleStartSearch, handlePauseSearch, handleStopSearch, handleSkipOpponent, initSocket };
}
