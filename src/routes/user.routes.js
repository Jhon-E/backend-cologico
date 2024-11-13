import { Router } from "express";
import { updateRol } from "../controllers/user.controller.js";

const router = Router();

//router.post("/users", getUsers);

//router.get("/users/:id", getVendedor);

router.put("/users/rol", updateRol);

export default router;