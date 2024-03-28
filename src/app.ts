import express, { Application, Request, Response } from 'express';
import { createRoutes } from './frameworks/expressSpecific/routes/index';
import { dependencies } from './config/dependecies';
import errorHandler from './frameworks/expressSpecific/errorHanler';
import { loggerMiddleware } from 'frameworks/expressSpecific/middleware/logger.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import cors from 'cors';

const app: Application = express();
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(API_PREFIX, createRoutes(dependencies));

app.use(errorHandler);

app.use((req: Request, res: Response) => {
	res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 3000;

const startServer = () => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

export { app, startServer };
