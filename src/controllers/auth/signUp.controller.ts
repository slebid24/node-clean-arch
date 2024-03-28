import { Request, Response, NextFunction } from 'express';
import { Dependencies } from 'config/dependecies';

export const signUpController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;
			const result = await dependencies.signUpUseCase.execute({ email, password });
			res.status(201).json(result);
		} catch (error) {
			next(error);
		}
	};
};
