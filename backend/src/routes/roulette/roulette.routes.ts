import { Router } from "express";

import * as rouletteController from "./roulette.controller";

const router = Router();

router.get("/language", rouletteController.getRoulettesLanguages);
router.post("/", rouletteController.createRoulette);
router.delete("/:id", rouletteController.deleteRoulette);
router.delete("/", rouletteController.deleteAllRoulettes);
router.get("/", rouletteController.getAllRoulettes);
router.get("/:id", rouletteController.getRoulette);

export default router;
