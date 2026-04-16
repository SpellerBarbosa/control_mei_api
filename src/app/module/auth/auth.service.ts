import User from '../user/user.model.js';
import jwt from 'jsonwebtoken';

interface ServiceResponse {
	message: string;
	token?: string;
	statusCode: number;
}

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
	throw new Error(' Variavel de ambiente nao foi configurada.');
}

const authService = async (
	username: string,
	password: string,
): Promise<ServiceResponse> => {
	try {
		const user = await User.findOne({ username }).select('+password');

		if (!user) {
			return {
				statusCode: 401,
				message: 'Usuário ou senha inválidos.',
			};
		}

		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return {
				statusCode: 401,
				message: 'Usuário ou senha inválidos.',
			};
		}

		const token = jwt.sign(
			{ username: user.username, role: user.role },
			SECRET_KEY,
			{ expiresIn: '1h' },
		);

		return {
			statusCode: 200,
			message: 'Login efetuado com sucesso.',
			token,
		};
	} catch (error: unknown) {
		console.error(error);

		return {
			statusCode: 500,
			message: 'Erro interno do servidor.',
		};
	}
};

export default authService;
