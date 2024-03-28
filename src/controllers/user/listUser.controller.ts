import { Request, Response, NextFunction } from 'express';
import { Dependencies } from '../../config/dependecies';

export const listUsersController = (dependencies: Dependencies) => {
	return async (_: Request, res: Response, next: NextFunction) => {
		try {
			const users = await dependencies.listUsersUseCase.execute();
			res.json(users);
		} catch (err) {
			next(err);
		}
	};
};
