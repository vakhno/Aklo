import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import * as rouletteController from "./roulette.controller.js";

const router = Router();

router.get("/language", rouletteController.getRoulettesLanguages);
router.get("/", rouletteController.getAllRoulettes);
router.get("/:id", rouletteController.getRoulette);

router.post("/", requireAdmin, rouletteController.createRoulette);
router.put("/:id", requireAdmin, rouletteController.updateRoulette);
router.delete("/:id", requireAdmin, rouletteController.deleteRoulette);
router.get("/:id/users", requireAdmin, rouletteController.getRouletteUsers);
router.delete("/:id/users/:userId", requireAdmin, rouletteController.removeRouletteUser);

export default router;
