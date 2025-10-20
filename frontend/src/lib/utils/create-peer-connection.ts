import type { Socket } from "socket.io-client";

interface CreatePeerParams {
	socket: Socket;
	stream: MediaStream | null;
	partnerSocketId: string;
	isInitiator: boolean;
	onRemoteStream: (stream: MediaStream) => void;
}

export function createPeer({
	socket,
	stream,
	partnerSocketId,
	isInitiator,
	onRemoteStream
}: CreatePeerParams): RTCPeerConnection {
	const peer = new RTCPeerConnection({
		iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }, { urls: "stun:stun2.l.google.com:19302" }]
	});

	if (stream) {
		stream.getTracks().forEach(track => peer.addTrack(track, stream));
	}

	peer.onicecandidate = (event) => {
		if (event.candidate) {
			socket.emit("signal", { partnerSocketId, data: { candidate: event.candidate } });
		}
	};

	peer.ontrack = (event) => {
		onRemoteStream(event.streams[0]);
	};

	if (isInitiator) {
		peer.createOffer().then(async (offer) => {
			console.warn("peer.createOffer", offer);
			try {
				await peer.setLocalDescription(offer);
				socket.emit("signal", { partnerSocketId, data: offer });
			}
			catch (error) {
				console.warn("createOffer", error);
			}
		}).catch((error) => {
			console.error("Error creating offer:", error);
		});
	}

	return peer;
}
