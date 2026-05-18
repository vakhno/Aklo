import { ROLES_LIST } from "./constants";
import { z } from "zod";

export const roleSchema = z.enum(ROLES_LIST);

const setRoleBodySchema = z.object({
    userId: z.string().min(1, "User id is required"),
    role: roleSchema,
});

const adminUpdateUserBodySchema = z.object({
    userId: z.string().min(1, "User id is required"),
    data: z.object({
        name: z.string().min(1).max(100).optional(),
        email: z.string().email().optional(),
        image: z.string().url().optional(),
    }),
});
