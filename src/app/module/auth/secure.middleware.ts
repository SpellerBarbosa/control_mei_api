import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
	user?: jwt.JwtPayload;
}

const secret = process.env.SECRET_KEY;
if (!secret) {
	throw new Error('Variavel de ambiente não configurada.');
}

export const secureMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res
			.status(401)
			.json({ message: 'Token nao fornecido ou inválido.' });
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(400).json({ message: 'Token não fornecido.' });
	}

	try {
		const decoded = jwt.verify(token, secret);

		req.user = decoded as JwtPayload;

		next();
	} catch (error) {
		return res.status(403).json({ message: 'Token inválido ou expirado.' });
	}
};
