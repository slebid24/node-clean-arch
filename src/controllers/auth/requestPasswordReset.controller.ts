import { Request, Response, NextFunction } from 'express';
import { Dependencies } from 'config/dependecies';

export const requestPasswordResetController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email } = req.body;
			await dependencies.generatePasswordResetTokenUseCase.execute(email);

			res.status(200).json({ message: 'If an account with that email exists, a password reset email has been sent.' });
		} catch (error) {
			next(error);
		}
	};
};
