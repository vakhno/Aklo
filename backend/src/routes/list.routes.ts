import { Router } from "express";

import * as listController from "../controllers/list.controller";

const router = Router();

router.get("/used-languages", listController.getUsedLanguages);
router.get("/used-categories", listController.getUsedCategories);

export default router;
