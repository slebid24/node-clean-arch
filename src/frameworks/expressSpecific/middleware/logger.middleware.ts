import { Request, Response, NextFunction } from 'express';
import logger from 'config/logger';

export const loggerMiddleware = (req: Request, _: Response, next: NextFunction) => {
	logger.info(`${req.method} ${req.originalUrl}`);
	next();
};
