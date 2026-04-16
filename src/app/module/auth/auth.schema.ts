import * as z from 'zod';

export const authSchema = z.object({
	username: z
		.string()
		.min(3, 'Usuário deve ter no minimo 3 caracteres')
		.lowercase(),
	password: z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
});

export type authSchema = z.infer<typeof authSchema>;


