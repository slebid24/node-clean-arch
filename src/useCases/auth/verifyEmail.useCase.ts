import { createUserRepository } from 'frameworks/repositories/user.repository';
import { IError } from 'frameworks/expressSpecific/errorHanler';
import logger from 'config/logger';

export const createVerifyEmailUseCase = (userRepository: ReturnType<typeof createUserRepository>) => {
	return {
		execute: async (verificationToken: string) => {
			try {
				const user = await userRepository.findByVerificationToken(verificationToken);

				if (!user) {
					const error: IError = new Error('User not found or token is invalid');
					error.status = 404;
					logger.warn(`Email verification failed for token: ${verificationToken}`);
					throw error;
				}

				await userRepository.update(user.id, {
					emailVerified: true,
					verificationToken: null,
				});

				logger.info(`Email verified successfully for user: ${user.id}`);
				return { message: 'Email verified successfully' };
			} catch (error) {
				logger.error('Error in createVerifyEmailUseCase', { error });
				throw error;
			}
		},
	};
};
