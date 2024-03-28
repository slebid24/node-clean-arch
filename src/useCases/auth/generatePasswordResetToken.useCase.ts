import { EmailService } from 'services/email.service';
import { createUserRepository } from '../../frameworks/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export const createGeneratePasswordResetTokenUseCase = (
	userRepository: ReturnType<typeof createUserRepository>,
	emailService: EmailService
) => {
	return {
		execute: async (email: string) => {
			const user = await userRepository.findByEmail(email);
			if (!user) {
				const error: IError = new Error('User not found');
				error.status = 404;
				throw error;
			}

			const passwordResetToken = uuidv4();
			const passwordResetTokenExp = new Date();
			passwordResetTokenExp.setHours(passwordResetTokenExp.getHours() + 1);

			await userRepository.update(user.id, {
				passwordResetToken,
				passwordResetTokenExp,
			});

			await emailService.sendPasswordResetEmail(user, passwordResetToken);

			return { message: 'If an account with that email exists, a password reset email has been sent.' };
		},
	};
};
