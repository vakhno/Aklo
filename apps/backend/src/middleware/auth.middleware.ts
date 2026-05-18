import type { NextFunction, Request, Response } from "express";

import { getAuthServer } from "@shared/auth/server";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const server = getAuthServer();
		const session = await server.api.getSession({
			headers: new Headers({
				Authorization: `Bearer ${token}`,
				cookie: req.headers.cookie || "",
			}),
		});

		if (!session || !session.user) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		(req as Request & { session: typeof session }).session = session;
		next();
	}
	catch {
		res.status(401).json({ error: "Unauthorized" });
	}
}
