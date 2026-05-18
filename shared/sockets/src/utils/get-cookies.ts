import type { Request } from "express";
import type { Socket } from "socket.io";
import type { Cookies } from "cookie";
import cookie from "cookie";

export const getCookies = ({ req, socket }: { req?: Request; socket?: Socket }): Cookies => {
	if (req) {
		return req.cookies;
	}
	else if (socket) {
		return cookie.parse(socket.handshake.headers.cookie || "");
	}

	return {};
};
