import { IError } from 'frameworks/expressSpecific/errorHanler';
import { User } from '../../entities/User';
import { createUserRepository } from '../../frameworks/repositories/user.repository';
import logger from 'config/logger';

export const createAddUserUseCase = (userRepository: ReturnType<typeof createUserRepository>) => {
	return {
		execute: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
			try {
				if (!userData.password) {
					const error: IError = new Error('Password is required');
					error.status = 400;
					throw error;
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const newUser = await userRepository.add(userData as any);
				return newUser;
			} catch (error) {
				logger.error('Error in createAddUserUseCase', { error });
				const customError: IError = new Error('Failed to add new user');
				throw customError;
			}
		},
	};
};
