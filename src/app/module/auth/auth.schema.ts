import * as z from 'zod';

const usernameSchema = z
	.string({
		error: (issue) =>
			issue.input === undefined
				? 'Usuario e obrigatorio'
				: 'Usuario precisa ser um texto',
	})
	.trim()
	.min(3, 'Usuario deve ter no minimo 3 caracteres')
	.transform((value) => value.toLowerCase());

const passwordSchema = z.string({
	error: (issue) =>
		issue.input === undefined
			? 'Senha e obrigatoria'
			: 'Senha precisa ser um texto',
});

export const authSchema = z.object({
	username: usernameSchema,
	password: passwordSchema.min(6, 'Senha deve ter no minimo 6 caracteres'),
});

export type authSchema = z.infer<typeof authSchema>;
