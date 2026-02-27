import type { NextFunction, Request, Response } from "express";

import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../auth/index.js";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
	try {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		if (!session || !session.user) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const { role } = session.user;

		if (role !== "admin") {
			res.status(403).json({ error: "Forbidden: Admin access required" });
			return;
		}

		next();
	}
	catch {
		res.status(401).json({ error: "Unauthorized" });
	}
}
