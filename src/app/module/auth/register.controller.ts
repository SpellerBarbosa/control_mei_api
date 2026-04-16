import type { Request, Response } from "express";
import { userSchema } from "../user/user.schema.js";
import userRegister from "./register.service.js";

const registerController = async (req: Request, res: Response) => {
  try {
    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({
          message: parsed.error.issues[0]?.message || "Dados inválidos.",
        });
    }

    const { username, password, role } = parsed.data;

    const result = await userRegister(username, password, role);

    return res.status(result.statusCode).json({ message: result.message });
  } catch (error: unknown) {
    console.error(error);

    return res.status(500).json({ message: "erro interno do servidor." });
  }
};

export default registerController;
