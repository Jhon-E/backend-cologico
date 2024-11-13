import { Router } from "express";
import { signUpUser, logInUser, getUserSession } from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth", signUpUser);

router.post("/auth/login", logInUser);

router.get("/auth/profile", getUserSession);


export default router;
