import { Role } from 'entities/User';
import { Request, Response, NextFunction } from 'express';

export const roleGuard = (allowedRoles: Role[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user;
		console.log(user);
		if (!user || !allowedRoles.includes(user.role)) {
			return res.status(403).json({ message: "You don't have permission to access this resource." });
		}
		next();
	};
};
