import { signInController } from './signIn.controller';
import { signUpController } from './signUp.controller';
import { refreshTokenController } from './refreshToken.contoller';
import { verifyEmailController } from './verifyEmail.controller';
import { requestPasswordResetController } from './requestPasswordReset.controller';
import { resetPasswordController } from './resetPassword.controller';

export const authControllers = {
	signInController,
	signUpController,
	refreshTokenController,
	verifyEmailController,
	requestPasswordResetController,
	resetPasswordController,
};
