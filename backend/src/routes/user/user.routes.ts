import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import * as userController from "./user.controller.js";

const router = Router();

router.get("/", requireAdmin, userController.listUsers);
router.put("/:id", requireAdmin, userController.updateUser);
router.delete("/:id", requireAdmin, userController.deleteUser);

export default router;
