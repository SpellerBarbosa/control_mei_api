import * as z from 'zod';
import { Roles } from '../common/constants.js';

const usernameSchema = z
	.string({
		error: (issue) =>
			issue.input === undefined
				? 'Usuario e obrigatorio'
				: 'Usuario precisa ser um texto',
	})
	.trim()
	.min(3, 'Usuario deve conter no minimo 3 caracteres')
	.transform((value) => value.toLowerCase());

const passwordSchema = z.string({
	error: (issue) =>
		issue.input === undefined
			? 'Senha e obrigatoria'
			: 'Senha precisa ser um texto',
});

export const userSchema = z.object({
	username: usernameSchema,
	password: passwordSchema.min(
		6,
		'Minimo a senha deve ter no minimo 6 caracteres',
	),
	role: z.enum(Roles, {
		error: (issue) =>
			issue.input === undefined
				? 'Role e obrigatoria'
				: 'Role invalida',
	}),
});

export type userSchema = z.infer<typeof userSchema>;
