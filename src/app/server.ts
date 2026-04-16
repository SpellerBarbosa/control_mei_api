import express from 'express';
import ConnectToDb from './config/ConnectToDB.js';
import { authRouter, userRouter } from './routes/index.js';

class App {
	private expressApp: express.Application;
	private port: number;
	constructor() {
		this.expressApp = express();
		this.port = 3000;

		this.middlewares();
		this.routes();
	}

	private middlewares() {
		this.expressApp.set('trust proxy', 1);
		this.expressApp.use(express.json());
	}

	private routes() {
		this.expressApp.use(userRouter);
		this.expressApp.use(authRouter);
	}

	public async start() {
		await ConnectToDb();

		this.expressApp.listen(this.port, () => {
			console.log(
				`Api connectada na porta http://localhost:${this.port}`,
			);
		});
	}
}

export default App;
