import { PrismaClient } from '@prisma/client';
import { createUserRepository } from '../frameworks/repositories/user.repository';
import { createGetUserByIdUseCase } from '../useCases/user/getUserById.useCase';
import { createAddUserUseCase } from '../useCases/user/addUser.useCase';
import { createDeleteUserUseCase } from '../useCases/user/deleteUser.useCase';
import { createListUsersUseCase } from '../useCases/user/listUser.useCase';
import { createUpdateUserUseCase } from '../useCases/user/updateUser.useCase';
import { createSignInUseCase } from 'useCases/auth/signIn.useCase';
import { createSignUpUseCase } from 'useCases/auth/signUp.useCase';
import { TokenService } from 'services/token.service';
import { EmailService } from 'services/email.service';
import { createRefreshTokenUseCase } from 'useCases/auth/refreshToken.useCase';
import { createVerifyEmailUseCase } from 'useCases/auth/verifyEmail.useCase';
import { createGeneratePasswordResetTokenUseCase } from 'useCases/auth/generatePasswordResetToken.useCase';
import { createResetPasswordUseCase } from 'useCases/auth/resetPassword.useCase';

const prisma = new PrismaClient();

const userRepository = createUserRepository(prisma);
const tokenService = new TokenService();
const emailService = new EmailService();

const getUserByIdUseCase = createGetUserByIdUseCase(userRepository);
const addUserUseCase = createAddUserUseCase(userRepository);
const updateUserUseCase = createUpdateUserUseCase(userRepository);
const deleteUserUseCase = createDeleteUserUseCase(userRepository);
const listUsersUseCase = createListUsersUseCase(userRepository);

const signInUseCase = createSignInUseCase(userRepository, tokenService);
const signUpUseCase = createSignUpUseCase(userRepository, tokenService, emailService);
const refreshTokenUseCase = createRefreshTokenUseCase(userRepository, tokenService);
const verifyEmailUseCase = createVerifyEmailUseCase(userRepository);
const generatePasswordResetTokenUseCase = createGeneratePasswordResetTokenUseCase(userRepository, emailService);
const resetPasswordUseCase = createResetPasswordUseCase(userRepository);

export type Dependencies = {
	getUserByIdUseCase: ReturnType<typeof createGetUserByIdUseCase>;
	addUserUseCase: ReturnType<typeof createAddUserUseCase>;
	updateUserUseCase: ReturnType<typeof createUpdateUserUseCase>;
	deleteUserUseCase: ReturnType<typeof createDeleteUserUseCase>;
	listUsersUseCase: ReturnType<typeof createListUsersUseCase>;
	signInUseCase: ReturnType<typeof createSignInUseCase>;
	signUpUseCase: ReturnType<typeof createSignUpUseCase>;
	refreshTokenUseCase: ReturnType<typeof createRefreshTokenUseCase>;
	verifyEmailUseCase: ReturnType<typeof createVerifyEmailUseCase>;
	generatePasswordResetTokenUseCase: ReturnType<typeof createGeneratePasswordResetTokenUseCase>;
	resetPasswordUseCase: ReturnType<typeof createResetPasswordUseCase>;
};

export const dependencies: Dependencies = {
	getUserByIdUseCase,
	addUserUseCase,
	updateUserUseCase,
	deleteUserUseCase,
	listUsersUseCase,
	signInUseCase,
	signUpUseCase,
	refreshTokenUseCase,
	verifyEmailUseCase,
	generatePasswordResetTokenUseCase,
	resetPasswordUseCase,
};
