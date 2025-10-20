import type { Socket } from "socket.io-client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

interface UseRoomConnectionProps {
	roomId: string;
	localStream: MediaStream | null;
}

interface UseRoomConnectionReturn {
	remoteStream: MediaStream | null;
	remoteAudioRef: React.RefObject<HTMLAudioElement | null>;
	isExpired: boolean;
	isHasGuest: boolean;
	socketRef: React.RefObject<Socket | null>;
	disconnectPeer: () => void;
}

export const useWebRTC = ({
	roomId,
	localStream
}: UseRoomConnectionProps): UseRoomConnectionReturn => {
	const [isHasGuest, setHasGuest] = useState(false);
	const [isExpired, setExpired] = useState(false);
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

	const socketRef = useRef<Socket | null>(null);
	const peerRef = useRef<RTCPeerConnection | null>(null);
	const remoteStreamRef = useRef<MediaStream | null>(null);
	const remoteAudioRef = useRef<HTMLAudioElement>(null);

	const createPeer = (stream: MediaStream, initiator: boolean): RTCPeerConnection => {
		const peer = new RTCPeerConnection({
			iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
		});

		stream.getTracks().forEach(track => peer.addTrack(track, stream));

		if (!remoteStreamRef.current) {
			remoteStreamRef.current = new MediaStream();
		}

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
				socketRef.current.emit("opponents-room-send-ice-candidate", {
					candidate: event.candidate
				});
			}
		};

		peerRef.current = peer;

		if (initiator) {
			peer.createOffer()
				.then(offer => peer.setLocalDescription(offer))
				.then(() => {
					if (socketRef.current) {
						socketRef.current.emit("opponents-room-send-offer", {
							offer: peer.localDescription
						});
					}
				});
		}

		return peer;
	};

	const disconnectPeer = () => {
		if (peerRef.current) {
			peerRef.current.close();
			peerRef.current = null;
		}
		remoteStreamRef.current = null;
		setRemoteStream(null);
		setHasGuest(false);
	};

	useEffect(() => {
		if (!localStream) {
			return;
		}

		const socket = io(import.meta.env.VITE_SOCKET_URL, {
			transports: ["websocket"]
		});
		socketRef.current = socket;

		socket.emit("self-room-join", roomId);

		socket.on("room-expired", () => {
			setExpired(true);
			peerRef.current?.close();
		});

		socket.on("self-room-join-failed", () => {

		});

		socket.on("self-room-join-success", () => {
			createPeer(localStream, true);
		});

		socket.on("opponents-room-new-join", () => {
		});

		socket.on("opponents-room-receive-offer", async ({ offer }) => {
			const peer = createPeer(localStream, false);
			await peer.setRemoteDescription(new RTCSessionDescription(offer));
			const answer = await peer.createAnswer();
			await peer.setLocalDescription(answer);
			socket.emit("opponents-room-send-answer", { answer });
		});

		socket.on("opponents-room-receive-answer", async ({ answer }) => {
			if (peerRef.current && peerRef.current.signalingState !== "stable") {
				await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
			}
		});

		socket.on("opponents-room-receive-ice-candidate", async ({ candidate }) => {
			if (peerRef.current) {
				await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));

				setHasGuest(true);
			}
		});

		socket.on("opponents-room-user-disconnect", () => {
			disconnectPeer();
		});

		return () => {
			if (peerRef.current) {
				peerRef.current.close();
			}
			socket.disconnect();
		};
	}, [roomId, localStream]);

	return {
		remoteStream,
		remoteAudioRef,
		isHasGuest,
		isExpired,
		socketRef,
		disconnectPeer
	};
};
