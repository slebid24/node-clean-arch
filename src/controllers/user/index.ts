import { addUserController } from './addUser.controller';
import { getUserByIdController } from './getUser.controller';
import { listUsersController } from './listUser.controller';
import { updateUserController } from './updateUser.controller';
import { deleteUserController } from './deleteUser.controller';

export const userControllers = {
	getUserByIdController,
	addUserController,
	listUsersController,
	updateUserController,
	deleteUserController,
};
