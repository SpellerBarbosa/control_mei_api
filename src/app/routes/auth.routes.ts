import { Router } from "express";
import authController from "../module/auth/auth.controller.js";
import { authLimiter } from "../module/auth/auth.middleware.js";


const authRouter = Router();

authRouter.post('/api/login', authLimiter, authController);

export default authRouter;
