import * as z from "zod";
import { Roles } from "../common/constants.js";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Usuário deve conter no minimo 3 caracteres")
    .lowercase(),

  password: z
    .string()
    .min(6, 'Minimo a senha deve ter no minimo 6 caracteres'),

    role:z.enum(Roles)
})
 

export type userSchema = z.infer<typeof userSchema>;