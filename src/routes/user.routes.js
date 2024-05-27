import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.post("/users", getUsers);

router.get("/users/:id", getUser);

export default router;