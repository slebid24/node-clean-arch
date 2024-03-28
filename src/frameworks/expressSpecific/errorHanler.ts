import { NextFunction, Request, Response } from 'express';

export interface IError {
	status?: number;
	msg?: string;
	message?: string;
	reason?: string;
	stack?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	validationErrors?: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: IError, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.status || 500;
	const errorMessage = err.msg || err.message || 'An unexpected error occurred';
	const errorReason = err.reason || err.stack || 'No error stack available';

	console.error(`[${req.method}] ${req.originalUrl} >> StatusCode:: ${statusCode}, Error:: ${errorMessage}`);

	res.status(statusCode).json({
		status: false,
		error: {
			message: errorMessage,
			reason: errorReason,
			url: req.originalUrl,
			ip: req.ip,
			validationErrors: err.validationErrors,
		},
	});
};
