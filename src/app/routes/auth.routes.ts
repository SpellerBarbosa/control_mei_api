import { Router } from "express";
import authController from "../module/auth/auth.controller.js";

const authRouter = Router();

authRouter.post('/api/login', authController);

export default authRouter;
