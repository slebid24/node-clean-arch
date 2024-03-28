import { createUserRepository } from 'frameworks/repositories/user.repository';
import bcrypt from 'bcrypt';
import { IError } from 'frameworks/expressSpecific/errorHanler';
import logger from 'config/logger';

export const createResetPasswordUseCase = (userRepository: ReturnType<typeof createUserRepository>) => {
	return {
		execute: async (passwordResetToken: string, newPassword: string) => {
			try {
				const user = await userRepository.findByPasswordResetToken(passwordResetToken);
				if (!user || !user.passwordResetTokenExp || new Date() > user.passwordResetTokenExp) {
					logger.warn('Invalid or expired password reset token attempt');
					const error: IError = new Error('Invalid or expired password reset token');
					error.status = 400;
					throw error;
				}

				const hashedPassword = await bcrypt.hash(newPassword, 10);
				await userRepository.update(user.id, {
					password: hashedPassword,
					passwordResetToken: null,
					passwordResetTokenExp: null,
				});
				logger.info(`Password reset successful for user: ${user.id}`);
			} catch (error) {
				logger.error('Error resetting password: ', error);
				throw error;
			}
		},
	};
};
