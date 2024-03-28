import { Request, Response, NextFunction } from 'express';
import { Dependencies } from '../../config/dependecies';

export const getUserByIdController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const user = await dependencies.getUserByIdUseCase.execute(+id);
			res.json(user);
		} catch (err) {
			next(err);
		}
	};
};
