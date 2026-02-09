import { Router } from "express";

import * as languageController from "./language.controller.js";

const router = Router();

router.post("/", languageController.createLanguage);
router.get("/", languageController.getLanguages);
router.get("/:id", languageController.getLanguage);
router.delete("/", languageController.deleteAllLanguages);

export default router;
