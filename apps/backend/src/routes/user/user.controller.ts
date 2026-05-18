import type { RoleType } from "@shared/auth/types";
import type { Request, Response } from "express";

// import { roleSchema } from "@shared/auth";
import { adminUpdateUser, getAuthServer, getListOfUsers, removeUser, setRole } from "@shared/auth/server";
import { roleSchema } from "@shared/auth/validation";
import { fromNodeHeaders } from "better-auth/node";

export async function listUsers(req: Request, res: Response) {
	try {
		const server = getAuthServer();
		const limit = req.query.limit ? Number(req.query.limit) : 5000;
		const offset = req.query.offset ? Number(req.query.offset) : 0;
		const options = {
			headers: fromNodeHeaders(req.headers),
			query: {
				limit,
				offset,
			},
		};
		const data = await getListOfUsers({ server, options });

		res.status(200).json(data);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

// export async function updateUser(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params;
// 		const body = req.body as { name?: string; email?: string; image?: string; role?: string };

// 		if (!id) {
// 			res.status(400).json({ error: "User id is required" });
// 			return;
// 		}

// 		const data: Record<string, unknown> = {};
// 		if (body.name !== undefined)
// 			data.name = body.name;
// 		if (body.email !== undefined)
// 			data.email = body.email;
// 		if (body.image !== undefined)
// 			data.image = body.image;

// 		const updated = await (auth.api as { adminUpdateUser?: (opts: { body: { userId: string; data: Record<string, unknown> }; headers: ReturnType<typeof fromNodeHeaders> }) => Promise<unknown> }).adminUpdateUser?.({
// 			body: { userId: id, data },
// 			headers: fromNodeHeaders(req.headers),
// 		});

// 		if (body.role !== undefined) {
// 			const parsed = roleSchema.safeParse(body.role);
// 			const role = parsed.success ? parsed.data : "user";
// 			await auth.api.setRole({
// 				body: { userId: id, role },
// 				headers: fromNodeHeaders(req.headers),
// 			});
// 		}

// 		res.status(200).json(updated ?? { success: true });
// 	}
// 	catch (error) {
// 		res.status(500).json({ error: String(error) });
// 	}
// }

export async function updateUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const body = req.body as { name?: string; email?: string; image?: string; role?: string };

		if (!id) {
			res.status(400).json({ error: "User id is required" });
			return;
		}

		const server = getAuthServer();

		const data: Record<string, unknown> = {};
		if (body.name !== undefined)
			data.name = body.name;
		if (body.email !== undefined)
			data.email = body.email;
		if (body.image !== undefined)
			data.image = body.image;
		const options = {
			body: { userId: id, data },
			headers: fromNodeHeaders(req.headers),
		};

		const updated = await adminUpdateUser({ server, options });

		if (body.role !== undefined) {
			const parsed = roleSchema.safeParse(body.role);
			if (parsed.success) {
				const options = {
					body: { userId: String(id), role: parsed.data as RoleType },
					headers: fromNodeHeaders(req.headers),
				};
				await setRole({ server, options });
			}
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
		const server = getAuthServer();
		const options = {
			body: { userId: id },
			headers: fromNodeHeaders(req.headers),
		};

		await removeUser({ server, options });

		res.status(200).json({ success: true });
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}
