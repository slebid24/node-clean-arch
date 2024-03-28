import { Request, Response, NextFunction } from 'express';
import { Dependencies } from 'config/dependecies';

export const signInController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;
			const result = await dependencies.signInUseCase.execute(email, password);
			res.json(result);
		} catch (error) {
			next(error);
		}
	};
};
