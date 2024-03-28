import { z } from 'zod';

export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	role: z.enum(['USER', 'ADMIN']).optional(),
});
