import logger from 'config/logger';
import { createUserRepository } from '../../frameworks/repositories/user.repository';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export const createListUsersUseCase = (userRepository: ReturnType<typeof createUserRepository>) => {
	return {
		execute: async () => {
			try {
				const users = await userRepository.list();
				return users;
			} catch (error) {
				logger.error('Error listing users', { error });
				const customError: IError = new Error('Failed to list users');
				customError.status = 500;
				throw customError;
			}
		},
	};
};
