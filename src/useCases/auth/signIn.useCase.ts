import { createUserRepository } from 'frameworks/repositories/user.repository';
import { TokenService } from '../../services/token.service';
import bcrypt from 'bcrypt';
import { Role } from 'entities/User';
import logger from 'config/logger';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export const createSignInUseCase = (
	userRepository: ReturnType<typeof createUserRepository>,
	tokenService: TokenService
) => {
	return {
		execute: async (email: string, password: string) => {
			try {
				const userWithPassword = await userRepository.findByEmail(email);
				if (!userWithPassword) {
					logger.warn(`User not found: ${email}`);
					const error: IError = new Error('User not found');
					error.status = 404;
					throw error;
				}

				const isValid = await bcrypt.compare(password, userWithPassword.password);
				if (!isValid) {
					logger.warn(`Invalid password attempt for user: ${email}`);
					const error: IError = new Error('Invalid password');
					error.status = 401;
					throw error;
				}

				const accessToken = tokenService.generateAccessToken({
					userId: userWithPassword.id,
					email: userWithPassword.email,
					role: userWithPassword.role as Role,
				});
				const refreshToken = tokenService.generateRefreshToken({ userId: userWithPassword.id });

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password: _, ...userWithoutPassword } = userWithPassword;

				logger.info(`User signed in: ${email}`);

				return { user: userWithoutPassword, accessToken, refreshToken };
			} catch (error) {
				logger.error(`Sign in error: ${error}`);
				throw error;
			}
		},
	};
};
