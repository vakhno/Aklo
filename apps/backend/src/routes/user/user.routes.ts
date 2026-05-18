import { API_SEGMENT } from "@shared/routes/constants";
import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import * as userController from "./user.controller.js";

const router = Router();

router.get(`${API_SEGMENT.USER.LIST.path}`, requireAdmin, userController.listUsers);
router.put(`${API_SEGMENT.USER.CRUD.PUT.path}`, requireAdmin, userController.updateUser);
router.delete(`${API_SEGMENT.USER.CRUD.DELETE.path}`, requireAdmin, userController.deleteUser);

export default router;
