import type { NextFunction, Request, Response } from "express";

import { fromNodeHeaders, getAuthServer, getServerSessionUser } from "@shared/auth/server";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
	try {
		const server = getAuthServer();

		const user = await getServerSessionUser({ server, options: { headers: fromNodeHeaders(req.headers) } });

		if (!user) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const { role } = user;

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
