import { Router } from "express";
import { userController } from "../module/index.js";


const userRouter = Router();

userRouter.post('/api/register', userController)

export default userRouter;