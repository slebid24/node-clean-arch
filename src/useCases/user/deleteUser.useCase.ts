import logger from 'config/logger';
import { createUserRepository } from '../../frameworks/repositories/user.repository';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export const createDeleteUserUseCase = (userRepository: ReturnType<typeof createUserRepository>) => {
	return {
		execute: async (id: number) => {
			try {
				const deletionResult = await userRepository.delete(id);
				if (!deletionResult) {
					const error: IError = new Error('User not found or already deleted');
					error.status = 404;
					logger.warn(`Attempt to delete non-existent or already deleted user with ID: ${id}`);
					throw error;
				}
				logger.info(`User with ID: ${id} deleted successfully.`);
				return deletionResult;
			} catch (error) {
				logger.error('Error deleting user', { id, error: error });
				const customError: IError = new Error('Failed to delete user');
				throw customError;
			}
		},
	};
};
