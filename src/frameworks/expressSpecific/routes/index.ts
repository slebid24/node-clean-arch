import { Router } from 'express';
import { Dependencies } from '../../../config/dependecies';
import userRouter from './users';
import authRouter from './auth';

export const createRoutes = (dependencies: Dependencies): Router => {
	const router = Router();

	router.use('/users', userRouter(dependencies));
	router.use('/auth', authRouter(dependencies));

	return router;
};
