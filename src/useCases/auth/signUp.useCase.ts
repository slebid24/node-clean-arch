import { v4 as uuidv4 } from 'uuid';
import { TokenService } from 'services/token.service';
import { createUserRepository } from '../../frameworks/repositories/user.repository';
import bcrypt from 'bcrypt';
import { Role } from 'entities/User';
import logger from 'config/logger';
import { EmailService } from 'services/email.service';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export interface SignUpInput {
	email: string;
	password: string;
}

export const createSignUpUseCase = (
	userRepository: ReturnType<typeof createUserRepository>,
	tokenService: TokenService,
	emailService: EmailService
) => {
	return {
		execute: async (userData: SignUpInput) => {
			try {
				const existingUser = await userRepository.findByEmail(userData.email);
				if (existingUser) {
					const error: IError = new Error('User already exists with this email');
					error.status = 404;
					throw error;
				}
				const hashedPassword = await bcrypt.hash(userData.password, 10);
				const verificationToken = uuidv4();

				const newUser = await userRepository.add({
					email: userData.email,
					password: hashedPassword,
					verificationToken,
					emailVerified: false,
				});

				await emailService.sendConfirmationEmail(newUser, verificationToken);

				const accessToken = tokenService.generateAccessToken({
					userId: newUser.id || 0,
					email: newUser.email,
					role: newUser.role as Role,
				});
				const refreshToken = tokenService.generateRefreshToken({ userId: newUser.id || 0 });

				return { user: newUser, accessToken, refreshToken };
			} catch (error) {
				logger.error('SignUp use case error:', error);
				throw new Error('An error occurred during the sign-up process');
			}
		},
	};
};
