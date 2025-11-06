import type { Socket } from "socket.io-client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function useRouletteWebRTC(localStream: MediaStream | null, languageId: string) {
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
	const socketRef = useRef<Socket | null>(null);
	const peerRef = useRef<RTCPeerConnection | null>(null);
	const [guestSocket, setGuestSocket] = useState<string | null>(null);
	const [isSearching, setSearching] = useState(false);
	const [isFound, setFound] = useState(false);

	const remoteStreamRef = useRef<MediaStream | null>(null);
	const remoteAudioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		return () => {
			disconnectSocket();
			closePeer();
		};
	}, []);

	const createPeer = (stream: MediaStream, partnerSocketId: string, initiator: boolean): RTCPeerConnection => {
		const peer = new RTCPeerConnection({
			iceServers: [
				{ urls: "stun:stun1.l.google.com:19302" },
				{ urls: "stun:stun2.l.google.com:19302" }
			]
		});

		stream.getTracks().forEach(track => peer.addTrack(track, stream));

		remoteStreamRef.current = new MediaStream();

		peer.ontrack = (event) => {
			if (!remoteStreamRef.current!.getTracks().find(t => t.id === event.track.id)) {
				remoteStreamRef.current!.addTrack(event.track);

				if (remoteAudioRef.current) {
					remoteAudioRef.current.srcObject = remoteStreamRef.current;
					remoteAudioRef.current.play().catch(e => console.error("Audio play error:", e));
				}

				setRemoteStream(remoteStreamRef.current);
			}
		};

		peer.onicecandidate = (event) => {
			if (event.candidate && socketRef.current) {
				socketRef.current.emit("opponents-roulette-send-ice-candidate", {
					partnerSocketId,
					candidate: event.candidate
				});
			}
		};

		if (initiator) {
			peer.createOffer()
				.then(offer => peer.setLocalDescription(offer))
				.then(() => {
					if (peer.localDescription && socketRef.current) {
						socketRef.current.emit("opponents-roulette-send-offer", {
							partnerSocketId,
							offer: peer.localDescription
						});
					}
				});
		}

		return peer;
	};

	function initSocket() {
		if (!localStream) {
			return;
		}

		const socket = io(import.meta.env.VITE_SOCKET_URL, {
			transports: ["websocket"]
		});

		socket.on("connect", () => {
			socketRef.current = socket;

			socket.emit("self-roulette-join", { languageId });

			socket.on("roulette-left", () => {
				setSearching(true);
				setRemoteStream(null);
				setFound(false);
				setGuestSocket(null);

				remoteStreamRef.current = null;

				closePeer();

				socket.emit("self-roulette-start-search-after-opponent-skip");
			});

			socket.on("roulette-detect", async ({ partnerSocketId, isInitiator }) => {
				remoteStreamRef.current = null;
				setRemoteStream(null);

				setSearching(false);
				setFound(true);
				setGuestSocket(partnerSocketId);

				peerRef.current = createPeer(localStream, partnerSocketId, isInitiator);
			});

			socket.on("opponents-roulette-skip", async () => {
				setSearching(true);
				setRemoteStream(null);
				setFound(false);
				setGuestSocket(null);

				remoteStreamRef.current = null;

				closePeer();

				socket.emit("self-roulette-skip-search");
			});

			socket.on("opponents-roulette-receive-offer", async ({ partnerSocketId, offer }: { partnerSocketId: string; offer: RTCSessionDescription }) => {
				if (offer && peerRef.current) {
					await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));

					const answer = await peerRef.current.createAnswer();

					await peerRef.current.setLocalDescription(answer);

					socket.emit("opponents-roulette-send-answer", { partnerSocketId, answer });
				}
			});

			socket.on("opponents-roulette-receive-answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
				if (peerRef.current && peerRef.current.signalingState !== "stable") {
					await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
				}
			});

			socket.on("opponents-roulette-receive-ice-candidate", async ({ candidate }) => {
				if (peerRef.current) {
					await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
				}
			});
		});
	}

	function startSearch() {
		if (socketRef.current && localStream) {
			const socket = socketRef.current;

			setSearching(true);

			socket.emit("self-roulette-start-search");
		}
	}

	function pauseSearch() {
		setSearching(false);

		if (socketRef.current) {
			socketRef.current.emit("roulette-pause");
		}
	}

	function stopSearch() {
		setRemoteStream(null);
		setFound(false);
		setGuestSocket(null);

		remoteStreamRef.current = null;

		closePeer();

		if (socketRef.current) {
			socketRef.current.emit("roulette-stop");
		}
	}

	function skipOpponent() {
		setRemoteStream(null);
		setFound(false);
		setGuestSocket(null);
		setSearching(true);

		closePeer();

		remoteStreamRef.current = null;

		if (socketRef.current) {
			const socket = socketRef.current;

			socket.emit("roulette-skip");
		}
	}

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

	return { myStream: localStream, remoteStream, remoteAudioRef, guestSocket, isSearching, isFound, initSocket, startSearch, pauseSearch, stopSearch, skipOpponent };
}
