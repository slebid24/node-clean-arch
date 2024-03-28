import { Request, Response, NextFunction } from 'express';
import { Dependencies } from '../../config/dependecies';

export const deleteUserController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			await dependencies.deleteUserUseCase.execute(+id);
			res.status(204).send();
		} catch (err) {
			next(err);
		}
	};
};
