import type { Request, Response } from "express";

import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../../auth/index.js";

export async function listUsers(req: Request, res: Response) {
	try {
		const limit = req.query.limit ? Number(req.query.limit) : 5000;
		const offset = req.query.offset ? Number(req.query.offset) : 0;

		const data = await auth.api.listUsers({
			headers: fromNodeHeaders(req.headers),
			query: {
				limit,
				offset,
			},
		});

		res.status(200).json(data);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function updateUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const body = req.body as { name?: string; email?: string; image?: string; role?: string };

		if (!id) {
			res.status(400).json({ error: "User id is required" });
			return;
		}

		const data: Record<string, unknown> = {};
		if (body.name !== undefined)
			data.name = body.name;
		if (body.email !== undefined)
			data.email = body.email;
		if (body.image !== undefined)
			data.image = body.image;

		const updated = await (auth.api as { adminUpdateUser?: (opts: { body: { userId: string; data: Record<string, unknown> }; headers: ReturnType<typeof fromNodeHeaders> }) => Promise<unknown> }).adminUpdateUser?.({
			body: { userId: id, data },
			headers: fromNodeHeaders(req.headers),
		});

		if (body.role !== undefined) {
			const role = body.role === "admin" || body.role === "user" ? body.role : "user";
			await auth.api.setRole({
				body: { userId: id, role },
				headers: fromNodeHeaders(req.headers),
			});
		}

		res.status(200).json(updated ?? { success: true });
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "User id is required" });
			return;
		}

		await auth.api.removeUser({
			body: { userId: id },
			headers: fromNodeHeaders(req.headers),
		});

		res.status(200).json({ success: true });
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}
