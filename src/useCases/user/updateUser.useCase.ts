import logger from 'config/logger';
import { createUserRepository } from '../../frameworks/repositories/user.repository';
import { User as PrismaUser } from '@prisma/client';
import { IError } from 'frameworks/expressSpecific/errorHanler';

export const createUpdateUserUseCase = (userRepository: ReturnType<typeof createUserRepository>) => {
	return {
		execute: async (id: number, userData: Partial<PrismaUser>) => {
			try {
				const updatedUser = await userRepository.update(id, userData);
				if (!updatedUser) {
					const error: IError = new Error('User not found or update failed');
					error.status = 404;
					logger.warn('User update failed', { id, userData });
					throw error;
				}
				return updatedUser;
			} catch (error) {
				logger.error('Error updating user', { id, userData, error });
				const customError: IError = new Error('Failed to update user');
				customError.status = 500;
				throw customError;
			}
		},
	};
};
