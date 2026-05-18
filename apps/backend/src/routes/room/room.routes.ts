import { API_SEGMENT } from "@shared/routes/constants";
import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import * as roomController from "./room.controller.js";

const router = Router();

router.get(`${API_SEGMENT.ROOM.LIST.path}`, roomController.getAllRooms);

router.get(`${API_SEGMENT.ROOM.LANGUAGES.path}`, roomController.getRoomsLanguages);
router.get(`${API_SEGMENT.ROOM.OWN_ROOM_IDS.path}`, roomController.getOwnRoomIds);
router.post(`${API_SEGMENT.ROOM.CRUD.POST.path}`, requireAuth, roomController.createRoom);
router.get(`${API_SEGMENT.ROOM.CRUD.GET.path}`, roomController.getRoom);
router.post(`${API_SEGMENT.ROOM.JOIN.path}`, roomController.joinRoom);
router.delete(`${API_SEGMENT.ROOM.CRUD.DELETE.path}`, roomController.deleteRoom);
router.get(`${API_SEGMENT.ROOM.IS_CREATOR.path}`, roomController.checkIsCreator);
router.get(`${API_SEGMENT.ROOM.IS_AVAILABLE_TO_VISIT.path}`, roomController.isAvailableToVisit);

router.put(`${API_SEGMENT.ROOM.CRUD.PUT.path}`, requireAdmin, roomController.updateRoom);
router.get(`${API_SEGMENT.ROOM.USERS.path}`, requireAdmin, roomController.getRoomUsers);
router.delete(`${API_SEGMENT.ROOM.REMOVE_USER.path}`, requireAdmin, roomController.removeRoomUser);

export default router;
