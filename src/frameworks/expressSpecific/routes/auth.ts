import { Router } from 'express';
import { authControllers } from 'controllers/auth';
import { Dependencies } from '../../../config/dependecies';
import { signUpSchema } from 'schema/userSchema';
import { validateRequest } from '../middleware/validateReq.middleware';

export default (dependencies: Dependencies): Router => {
	const router = Router();

	const {
		signInController,
		signUpController,
		refreshTokenController,
		verifyEmailController,
		requestPasswordResetController,
		resetPasswordController,
	} = authControllers;

	router.post('/sign-in', signInController(dependencies));
	router.post('/sign-up', validateRequest(signUpSchema), signUpController(dependencies));
	router.post('/refresh', refreshTokenController(dependencies));
	router.get('/verify-email/:verificationToken', verifyEmailController(dependencies));
	router.post('/request-password-reset', requestPasswordResetController(dependencies));
	router.post('/reset-password', resetPasswordController(dependencies));

	return router;
};
