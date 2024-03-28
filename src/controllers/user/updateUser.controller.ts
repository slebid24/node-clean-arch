import { Dependencies } from 'config/dependecies';
import { Request, Response, NextFunction } from 'express';

export const updateUserController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const userData = req.body;
			const updatedUser = await dependencies.updateUserUseCase.execute(+id, userData);
			res.json(updatedUser);
		} catch (error) {
			next(error);
		}
	};
};
