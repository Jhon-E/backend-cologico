import { Router } from "express";
import { getComentsByProduct, createCommentAt } from "../controllers/coments.controller.js";

const router = Router();

router.get("/comments/:idPro", getComentsByProduct);

router.post("/comments", createCommentAt)

/* router.get("/products/:id", getProduct) */

export default router;