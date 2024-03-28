import { PrismaClient, Prisma } from '@prisma/client';

export const createUserRepository = (prisma: PrismaClient) => {
	return {
		add: async (userData: Prisma.UserCreateInput) => {
			const user = await prisma.user.create({
				data: userData,
				select: {
					id: true,
					email: true,
					createdAt: true,
					updatedAt: true,
					role: true,
				},
			});
			return user;
		},

		getById: async (id: number) => {
			return prisma.user.findUnique({
				where: { id },
				select: {
					id: true,
					email: true,
					createdAt: true,
					updatedAt: true,
					role: true,
				},
			});
		},

		update: async (id: number, userData: Prisma.UserUpdateInput) => {
			const user = await prisma.user.update({
				where: { id },
				data: userData,
			});
			return user;
		},

		delete: async (id: number) => {
			return prisma.user.delete({
				where: { id },
			});
		},

		list: async () => {
			return prisma.user.findMany({
				select: {
					id: true,
					email: true,
					createdAt: true,
					updatedAt: true,
				},
			});
		},

		findByEmail: async (email: string) => {
			return prisma.user.findUnique({
				where: { email },
				select: {
					id: true,
					email: true,
					password: true,
					createdAt: true,
					updatedAt: true,
					role: true,
				},
			});
		},
		findByVerificationToken: async (verificationToken: string) => {
			return prisma.user.findUnique({
				where: { verificationToken },
				select: {
					id: true,
					email: true,
					verificationToken: true,
					createdAt: true,
					updatedAt: true,
					role: true,
					emailVerified: true,
				},
			});
		},
		findByPasswordResetToken: async (passwordResetToken: string) => {
			return prisma.user.findUnique({
				where: { passwordResetToken },
				select: {
					id: true,
					email: true,
					createdAt: true,
					updatedAt: true,
					role: true,
					emailVerified: true,
					passwordResetTokenExp: true,
				},
			});
		},
	};
};
