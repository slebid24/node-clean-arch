import { Request, Response, NextFunction } from 'express';
import { Dependencies } from '../../config/dependecies';

export const addUserController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const newUser = await dependencies.addUserUseCase.execute(req.body);
			res.status(201).json({
				status: true,
				content: newUser,
			});
		} catch (err) {
			next(err);
		}
	};
};
