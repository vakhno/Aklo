import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import * as roomController from "./room.controller.js";

const router = Router();
router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoom);

router.get("/language", roomController.getRoomsLanguages);
router.get("/own-room-ids", roomController.getOwnRoomIds);
router.post("/", roomController.createRoom);
router.post("/:id/join", roomController.joinRoom);
router.delete("/:id", roomController.deleteRoom);
router.get("/:id/is-creator", roomController.checkIsCreator);
router.get("/:id/is-available-to-visit", roomController.isAvailableToVisit);

router.put("/:id", requireAdmin, roomController.updateRoom);
router.get("/:id/users", requireAdmin, roomController.getRoomUsers);
router.delete("/:id/users/:userId", requireAdmin, roomController.removeRoomUser);

export default router;
