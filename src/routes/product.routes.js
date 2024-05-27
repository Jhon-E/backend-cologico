import { Router } from "express";
import { createProduct, getProducts, getProduct } from "../controllers/products.controller.js";

const router = Router();

router.post("/products", createProduct)

router.get("/products", getProducts)

router.get("/products/:id", getProduct)

export default router;