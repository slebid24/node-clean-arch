import { createUserRepository } from 'frameworks/repositories/user.repository';
import { TokenService } from '../../services/token.service';
import { Role } from 'entities/User';
import logger from 'config/logger';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export const createRefreshTokenUseCase = (
	userRepository: ReturnType<typeof createUserRepository>,
	tokenService: TokenService
) => {
	return {
		execute: async (refreshToken: string) => {
			try {
				const payload = tokenService.verifyRefreshToken(refreshToken);
				const user = await userRepository.getById(payload.userId);
				if (!user) {
					const error: IError = new Error('User not found');
					error.status = 404;
					throw error;
				}
				const accessToken = tokenService.generateAccessToken({
					userId: user.id,
					email: user.email,
					role: user.role as Role,
				});
				return { accessToken };
			} catch (error) {
				logger.error('Refresh token use case error:', error);
				throw new Error('Invalid refresh token');
			}
		},
	};
};
