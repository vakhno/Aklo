import { Router } from "express";

import * as listController from "../controllers/list.controller";

const router = Router();

router.get("/used-categories", listController.getUsedCategories);
router.get("/used-languages", listController.getUsedLanguages);
router.get("/exist-languages", listController.getExistLanguages);

export default router;
