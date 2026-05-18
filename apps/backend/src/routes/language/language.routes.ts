import { API_SEGMENT } from "@shared/routes/constants";
import { Router } from "express";

import { requireAdmin } from "../../middleware/admin.middleware.js";
import * as languageController from "./language.controller.js";

const router = Router();

router.get(`${API_SEGMENT.LANGUAGE.LIST.path}`, languageController.getLanguages);
router.get(`${API_SEGMENT.LANGUAGE.CRUD.GET.path}`, languageController.getLanguage);

router.post(`${API_SEGMENT.LANGUAGE.CRUD.POST.path}`, requireAdmin, languageController.createLanguage);
router.put(`${API_SEGMENT.LANGUAGE.CRUD.PUT.path}`, requireAdmin, languageController.updateLanguage);
router.delete(`${API_SEGMENT.LANGUAGE.CRUD.DELETE.path}`, requireAdmin, languageController.deleteLanguage);

export default router;
