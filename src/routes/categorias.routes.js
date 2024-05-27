import { Router } from "express";
import { createCategoria, getCategories } from "../controllers/categorias.controller.js";

const router = Router();

router.post("/categories", createCategoria)

router.get("/categories", getCategories)


export default router;