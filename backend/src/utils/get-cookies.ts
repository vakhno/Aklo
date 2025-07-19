import type { Request } from "express";
import type { Socket } from "socket.io";

import cookie from "cookie";

export const getCookies = ({ req, socket }: { req?: Request; socket?: Socket }): Record<string, string> => {
	if (req) {
		return req.cookies;
	}
	else if (socket) {
		return cookie.parse(socket.handshake.headers.cookie || "");
	}

	return {};
};
