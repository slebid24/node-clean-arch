import logger from 'config/logger';
import { createUserRepository } from '../../frameworks/repositories/user.repository';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export const createGetUserByIdUseCase = (userRepository: ReturnType<typeof createUserRepository>) => {
	return {
		execute: async (id: number) => {
			try {
				const user = await userRepository.getById(id);
				if (!user) {
					const error: IError = new Error('User not found');
					error.status = 404;
					logger.warn('User not found', { id });
					throw error;
				}
				return user;
			} catch (error) {
				logger.error('Error fetching user by ID', { id, error });
				const customError: IError = new Error('Failed to fetch user by ID');
				customError.status = 500;
				throw customError;
			}
		},
	};
};
