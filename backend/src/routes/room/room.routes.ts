import { Router } from "express";

import * as roomController from "./room.controller";

const router = Router();

router.get("/language", roomController.getRoomsLanguages);
router.post("/:id/join", roomController.joinRoom);
router.post("/", roomController.createRoom);
router.get("/", roomController.getAllRooms);
router.get("/own-room-ids", roomController.getOwnRoomIds);
router.get("/:id", roomController.getRoom);
router.delete("/:id", roomController.deleteRoom);
router.get("/:id/is-creator", roomController.checkIsCreator);
router.get("/:id/is-available-to-visit", roomController.isAvailableToVisit);
router.delete("/", roomController.deleteAllRooms);

export default router;
