import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import * as languageController from "./language.controller.js";

const router = Router();

router.get("/", languageController.getLanguages);
router.get("/:id", languageController.getLanguage);

router.post("/", requireAdmin, languageController.createLanguage);
router.put("/:id", requireAdmin, languageController.updateLanguage);
router.delete("/:id", requireAdmin, languageController.deleteLanguage);

export default router;
