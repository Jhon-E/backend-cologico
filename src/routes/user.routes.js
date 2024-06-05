import { Router } from "express";
import { getVendedor, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.post("/users", getUsers);

router.get("/users/:id", getVendedor);

export default router;