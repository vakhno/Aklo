import type { Socket } from "socket.io-client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { createPeer } from "@/lib/utils/create-peer-connection";

export function useRouletteWebRTC(stream: MediaStream | null, languageId: string) {
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
	const socketRef = useRef<Socket | null>(null);
	const peerRef = useRef<RTCPeerConnection | null>(null);
	const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
	const [guestSocket, setGuestSocket] = useState("");
	const [isSearching, setSearching] = useState(false);
	const [isFound, setFound] = useState(false);

	useEffect(() => {
		joinRoulette();
		return () => {
			disconnectSocket();
			closePeer();
		};
	}, []);

	function closePeer() {
		if (peerRef.current) {
			peerRef.current.close();
			peerRef.current = null;
		}
	}

	function disconnectSocket() {
		if (socketRef.current) {
			socketRef.current?.disconnect();
		}
	}

	function stopSearch() {
		if (socketRef.current) {
			const socket = socketRef.current;

			socket.emit("roulette-stop", { languageId, guestSocket });

			closePeer();

			setSearching(false);
			setRemoteStream(null);
		}
	}

	function joinRoulette() {
		const socket = io(import.meta.env.VITE_SOCKET_URL, { transports: ["websocket"] });

		socket.on("connect", () => {
			socketRef.current = socket;

			socket.emit("roulette-join", { languageId });

			socket.on("roulette-left", () => {
				closePeer();

				setSearching(true);
				setRemoteStream(null);

				socket.emit("roulette-search", languageId);
			});

			socket.on("roulette-detect", async ({ partnerSocketId, isInitiator }) => {
				setGuestSocket(partnerSocketId);

				// if (!peerRef.current) {
				peerRef.current = createPeer({ socket, stream, partnerSocketId, isInitiator, onRemoteStream: setRemoteStream });
				// }

				setSearching(false);
				setFound(true);
			});

			socket.on("signal", async ({ sender, data }) => {
				if (!peerRef.current) {
					peerRef.current = createPeer({ socket, stream, partnerSocketId: sender, isInitiator: false, onRemoteStream: setRemoteStream });
				}

				if (data.type === "offer") {
					if (peerRef.current.signalingState === "stable" || peerRef.current.signalingState === "have-remote-offer") {
						await peerRef.current.setRemoteDescription(new RTCSessionDescription(data));

						while (pendingCandidates.current.length > 0) {
							const candidate = pendingCandidates.current.shift();
							await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
						}

						const answer = await peerRef.current.createAnswer();

						await peerRef.current.setLocalDescription(answer);

						socket.emit("signal", { partnerSocketId: sender, data: peerRef.current.localDescription });
					}
				}
				else if (data.type === "answer") {
					await peerRef.current.setRemoteDescription(new RTCSessionDescription(data));
				}
				else if (data.candidate) {
					if (peerRef.current.remoteDescription && peerRef.current.remoteDescription.type) {
						await peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
					}
					else {
						pendingCandidates.current.push(data.candidate);
					}
				}
			});
		});
	}

	function startSearch() {
		if (socketRef.current && stream) {
			const socket = socketRef.current;

			setSearching(true);

			socket.emit("roulette-search");
		}
	}

	function skipOpponent() {
		closePeer();

		setRemoteStream(null);
		setGuestSocket("");

		if (socketRef.current) {
			const socket = socketRef.current;

			socket.emit("roulette-skip", languageId);
		}
	}

	return { myStream: stream, remoteStream, guestSocket, isSearching, isFound, startSearch, stopSearch, skipOpponent };
}
