import { Router } from "express";

import * as rouletteController from "../controllers/roulette.controller";

const router = Router();

router.get("/", rouletteController.getAllRoulettes);
router.get("/:id", rouletteController.getRoulette);

export default router;
