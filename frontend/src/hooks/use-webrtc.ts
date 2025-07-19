import type { Socket } from "socket.io-client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { catchError } from "@/lib/utils/catch-error";
import { useGetRoom } from "@/queries/room";

export function useWebRTC(roomId: string, videoDeviceId?: string, audioDeviceId?: string, onRoomExpired?: () => void, onRoomDeleted?: () => void) {
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
	const [myStream, setMyStream] = useState<MediaStream | null>(null);
	const socketRef = useRef<Socket | null>(null);
	const peerRef = useRef<RTCPeerConnection | null>(null);
	const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
	const { mutateAsync: getRoom } = useGetRoom({});

	async function setupSocket() {
		const socket = io(import.meta.env.VITE_SOCKET_URL, { transports: ["websocket"] });

		if (socket) {
			socketRef.current = socket;

			// const constraints = {
			// 	video: videoDeviceId
			// 		? isMobileDevice
			// 			? { facingMode: "user" }
			// 			: videoDeviceId && videoDeviceId.length
			// 				? { deviceId: { exact: videoDeviceId } }
			// 				: true
			// 		: false,
			// 	audio: audioDeviceId
			// 		? { deviceId: { exact: audioDeviceId } }
			// 		: true
			// };

			const constraints = {
				video: videoDeviceId
					? { deviceId: { exact: videoDeviceId } }
					: true,
				audio: audioDeviceId
					? { deviceId: { exact: audioDeviceId } }
					: true
			};

			const [userMediaError, stream] = await catchError({ promise: navigator.mediaDevices.getUserMedia(constraints) });

			if (userMediaError) {
				throw userMediaError;
			}

			setMyStream(stream);

			socket.emit("join", roomId);

			socket.on("join-fail", () => {});

			socket.on("ready", () => {
				if (!peerRef.current) {
					peerRef.current = createPeer(socket, stream, roomId, true); // isInitiator = true
				}
			});

			socket.on("room-expired", () => {
				onRoomExpired && onRoomExpired();
				peerRef.current?.close();
			});

			socket.on("room-deleted", () => {
				onRoomDeleted && onRoomDeleted();
				peerRef.current?.close();
			});

			socket.on("leave", () => peerRef.current = null);

			socket.on("signal", async ({ data }) => {
				if (!peerRef.current) {
					peerRef.current = createPeer(socket, stream, roomId, false);
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

						socket.emit("signal", { roomId, data: peerRef.current.localDescription });
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
		}
	}

	function createPeer(socket: Socket, stream: MediaStream, roomId: string, isInitiator: boolean) {
		const peer = new RTCPeerConnection({
			iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
		});

		stream.getTracks().forEach(track => peer.addTrack(track, stream));

		peer.onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit("signal", { roomId, data: { candidate: event.candidate } });
			}
		};

		peer.ontrack = (event) => {
			setRemoteStream(event.streams[0]);
		};

		if (isInitiator) {
			peer.createOffer().then((offer) => {
				peer.setLocalDescription(offer);
				socket.emit("signal", { roomId, data: offer });
			});
		}

		return peer;
	};

	useEffect(() => {
		(async () => {
			await getRoom({ roomId });
			await setupSocket();
		})();

		const handleBeforeUnload = () => {
			socketRef.current?.emit("leave", roomId);
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			socketRef.current?.disconnect();
			peerRef.current?.close();
		};
	}, []);

	return { myStream, remoteStream };
}
