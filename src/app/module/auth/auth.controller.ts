import type { Request, Response } from 'express';
import { authSchema } from './auth.schema.js';
import authService from './auth.service.js';

const authController = async (req: Request, res: Response) => {
	const parsed = authSchema.safeParse(req.body);

	if (!parsed.success) {
		return res.status(400).json({
			message: parsed.error.issues[0]?.message || 'Dados invalidos',
		});
	}

	const { username, password } = parsed.data;

	try {
		const result = await authService(username, password);

		res.cookie('token', result.token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			path: '/',
			maxAge: 4 * 60 * 60 * 1000,
		});

		return res.status(result.statusCode).json({ message: result.message });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Erro interno no servidor' });
	}
};

export default authController;
