import { Router } from "express";

import * as languageController from "./language.controller";

const router = Router();

router.post("/", languageController.createLanguage);
router.get("/", languageController.getLanguages);
router.get("/:id", languageController.getLanguage);

export default router;
