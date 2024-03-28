import { Request, Response, NextFunction } from 'express';
import { Dependencies } from 'config/dependecies';

export const refreshTokenController = (dependencies: Dependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.body;
			const result = await dependencies.refreshTokenUseCase.execute(refreshToken);
			res.json(result);
		} catch (error) {
			next(error);
		}
	};
};
