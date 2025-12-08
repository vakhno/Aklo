import type { Socket } from "socket.io-client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { applyPeerRemoteAnswer } from "@/lib/peer/apply-peer-remote-answer";
import { applyPeerRemoteCandidate } from "@/lib/peer/apply-peer-remote-candidate";
import { createPeer } from "@/lib/peer/create-peer";
import { createPeerAnswer } from "@/lib/peer/create-peer-answer";
import { createPeerOffer } from "@/lib/peer/create-peer-offer";

interface RemotePeer {
	socketId: string;
	stream: MediaStream;
	connection: RTCPeerConnection;
}

interface UseRoomConnectionProps {
	roomId: string;
	localStream: MediaStream | null;
}

interface UseRoomConnectionReturn {
	remotePeers: Record<string, RemotePeer>;
	isExpired: boolean;
	isKicked: boolean;
	socketRef: React.RefObject<Socket | null>;
	handleKick: (socketId: string) => void;
	initSocket: () => void;
}

export const useWebRTC = ({
	roomId,
	localStream
}: UseRoomConnectionProps): UseRoomConnectionReturn => {
	const [isExpired, setExpired] = useState(false);
	const [isKicked, setKicked] = useState(false);
	const [remotePeers, setRemotePeers] = useState<Record<string, RemotePeer>>({});

	const socketRef = useRef<Socket | null>(null);
	const peersRef = useRef<Record<string, RTCPeerConnection>>({});

	const handleOnTrack = (targetSocketId: string) => {
		return (event: RTCTrackEvent, peer: RTCPeerConnection) => {
			setRemotePeers((prev) => {
				const updatePrev = { ...prev };
				const remoteStream = updatePrev[targetSocketId]?.stream || new MediaStream();

				if (!remoteStream.getTracks().find(track => track.id === event.track.id)) {
					remoteStream.addTrack(event.track);
				}

				updatePrev[targetSocketId] = {
					socketId: targetSocketId,
					stream: remoteStream,
					connection: peer
				};

				return updatePrev;
			});
		};
	};

	const handleOnIceCandidate = (targetSocketId: string) => {
		return (event: RTCPeerConnectionIceEvent) => {
			if (event.candidate && socketRef.current) {
				socketRef.current.emit("room-send-ice-candidate", {
					candidate: event.candidate,
					targetSocketId
				});
			}
		};
	};

	const handleKick = (socketId: string) => {
		if (socketRef.current && socketId) {
			const socket = socketRef.current;

			socket.emit("room-kick", { targetSocketId: socketId });
		}
	};

	const disconnectPeer = (socketId: string) => {
		const peer = peersRef.current[socketId];

		if (peer) {
			peer.close();

			delete peersRef.current[socketId];
		}

		setRemotePeers((prev) => {
			const updatePrev = { ...prev };

			delete updatePrev[socketId];

			return updatePrev;
		});
	};

	const disconnectAllPeers = () => {
		const peers = peersRef.current;

		Object.values(peers).forEach(peer => peer.close());
		peersRef.current = {};

		setRemotePeers(() => {
			const updatePrev = {};

			return updatePrev;
		});
	};

	const disconnectSocket = () => {
		if (socketRef.current) {
			socketRef.current?.disconnect();
		}
	};

	const initSocket = () => {
		if (!localStream) {
			return;
		}

		const socket = io(`${import.meta.env.VITE_SOCKET_URL}/room`, {
			transports: ["websocket"]
		});

		socket.on("connect", () => {
			socketRef.current = socket;

			socket.emit("room-join", roomId);

			socket.on("room-join-success", async ({ socketIdList }: { socketIdList: string[] }) => {
				await Promise.all(
					socketIdList.map(async (socketId) => {
						const peer = createPeer({ stream: localStream, handleOnTrack: handleOnTrack(socketId), handleOnIceCandidate: handleOnIceCandidate(socketId) });

						peersRef.current[socketId] = peer;

						await createPeerOffer({ peer });

						if (socketRef.current) {
							socketRef.current.emit("room-send-offer", {
								offer: peer.localDescription,
								targetSocketId: socketId
							});
						}
					})
				);
			});

			socket.on("room-join-failed", () => {});

			socket.on("room-new-join", () => {});

			socket.on("room-receive-offer", async ({ offer, fromSocketId }: { offer: RTCSessionDescription; fromSocketId: string }) => {
				const peer = createPeer({ stream: localStream, handleOnTrack: handleOnTrack(fromSocketId), handleOnIceCandidate: handleOnIceCandidate(fromSocketId) });

				peersRef.current[fromSocketId] = peer;

				const answer = await createPeerAnswer({ peer, offer });

				socket.emit("room-send-answer", {
					answer,
					targetSocketId: fromSocketId
				});
			});

			socket.on("room-receive-answer", async ({ answer, fromSocketId }: { answer: RTCSessionDescriptionInit; fromSocketId: string }) => {
				const peer = peersRef.current[fromSocketId];

				await applyPeerRemoteAnswer({ peer, answer });
			});

			socket.on("room-receive-ice-candidate", async ({ candidate, fromSocketId }: { candidate: RTCIceCandidate; fromSocketId: string }) => {
				const peer = peersRef.current[fromSocketId];

				await applyPeerRemoteCandidate({ peer, candidate });
			});

			socket.on("room-expired", () => {
				setExpired(true);

				disconnectAllPeers();
				disconnectSocket();

				socket.emit("room-disconnect");
			});

			socket.on("room-kick-success", () => {
				setKicked(true);

				disconnectAllPeers();
				disconnectSocket();

				socket.emit("room-disconnect");
			});

			socket.on("room-disconnect-success", () => {
				disconnectAllPeers();
				disconnectSocket();
			});

			socket.on("room-leave", (fromSocketId) => {
				disconnectPeer(fromSocketId);
			});
		});
	};

	useEffect(() => {
		return () => {
			disconnectAllPeers();
			disconnectSocket();
		};
	}, []);

	return {
		remotePeers,
		isExpired,
		isKicked,
		socketRef,
		handleKick,
		initSocket
	};
};
