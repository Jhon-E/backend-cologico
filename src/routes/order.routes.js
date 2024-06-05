import { Router } from "express";
import { createOrder, getOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/order", createOrder)

router.get("/order", getOrder)

/* router.put("/order", updateOrder) */

export default router;