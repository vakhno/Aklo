import { Router } from "express";

import * as roomController from "../controllers/room.controller";

const router = Router();

router.post("/", roomController.createRoom);
router.get("/", roomController.getAllRooms);
router.get("/own-room-ids", roomController.getOwnRoomIds);
router.get("/:id", roomController.getRoom);
router.delete("/:id", roomController.deleteRoom);
router.post("/:id/join", roomController.joinRoom);
router.get("/:id/is-creator", roomController.checkIsCreator);
router.delete("/:id", roomController.deleteRoom);

export default router;
