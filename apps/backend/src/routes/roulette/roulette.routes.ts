import { API_SEGMENT } from "@shared/routes/constants";
import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import * as rouletteController from "./roulette.controller.js";

const router = Router();

router.get(`${API_SEGMENT.ROULETTE.LANGUAGES.path}`, rouletteController.getRoulettesLanguages);
router.get(`${API_SEGMENT.ROULETTE.LIST.path}`, rouletteController.getAllRoulettes);
router.get(`${API_SEGMENT.ROULETTE.CRUD.GET.path}`, rouletteController.getRoulette);

router.post(`${API_SEGMENT.ROULETTE.CRUD.POST.path}`, requireAdmin, rouletteController.createRoulette);
router.put(`${API_SEGMENT.ROULETTE.CRUD.PUT.path}`, requireAdmin, rouletteController.updateRoulette);
router.delete(`${API_SEGMENT.ROULETTE.CRUD.DELETE.path}`, requireAdmin, rouletteController.deleteRoulette);
router.get(`${API_SEGMENT.ROULETTE.USERS.path}`, requireAdmin, rouletteController.getRouletteUsers);
router.delete(`${API_SEGMENT.ROULETTE.REMOVE_USER.path}`, requireAdmin, rouletteController.removeRouletteUser);

export default router;
