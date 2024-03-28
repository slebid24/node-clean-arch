import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../../services/token.service';

export const verifyTokenMiddleware = (tokenService: TokenService) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) {
			return res.sendStatus(401);
		}
		try {
			const payload = tokenService.verifyAccessToken(token);
			req.user = payload;
			next();
		} catch (error) {
			res.sendStatus(403);
		}
	};
};
