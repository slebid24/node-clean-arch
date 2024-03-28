import { Router } from 'express';
import { userControllers } from '../../../controllers/user';
import { Dependencies } from '../../../config/dependecies';
import { verifyTokenMiddleware } from '../middleware/verifyToken.middleware';
import { TokenService } from 'services/token.service';

export default (dependencies: Dependencies): Router => {
	const router = Router();
	const tokenService = new TokenService();
	const { getUserByIdController, addUserController, listUsersController, updateUserController, deleteUserController } =
		userControllers;

	router.get('/:id', verifyTokenMiddleware(tokenService), getUserByIdController(dependencies));

	router.post('/', addUserController(dependencies));

	router.get('/', listUsersController(dependencies));

	router.put('/:id', updateUserController(dependencies));

	router.delete('/:id', deleteUserController(dependencies));

	return router;
};
