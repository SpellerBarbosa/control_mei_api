import { Router } from "express";
import { registerController } from "../module/index.js";


const userRouter = Router();

userRouter.post("/api/register", registerController);

export default userRouter;
