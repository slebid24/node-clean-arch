import { Request, Response, NextFunction } from 'express';
import { Dependencies } from 'config/dependecies';

export const verifyEmailController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { verificationToken } = req.params;
			const result = await dependencies.verifyEmailUseCase.execute(verificationToken);
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};
};
