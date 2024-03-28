import { Request, Response, NextFunction } from 'express';
import { Dependencies } from 'config/dependecies';

export const resetPasswordController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { token, newPassword } = req.body;
			await dependencies.resetPasswordUseCase.execute(token, newPassword);

			res.status(200).json({ message: 'Your password has been successfully reset.' });
		} catch (error) {
			next(error);
		}
	};
};
