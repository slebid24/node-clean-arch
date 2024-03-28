/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserRepository } from '../../../src/frameworks/repositories/user.repository';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => ({
	PrismaClient: jest.fn().mockImplementation(() => ({
		user: {
			create: jest.fn(),
			findUnique: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			findMany: jest.fn(),
		},
	})),
}));

describe('UserRepository', () => {
	let userRepository: any;
	let mockPrismaClient: any;

	beforeAll(() => {
		mockPrismaClient = new PrismaClient();
		userRepository = createUserRepository(mockPrismaClient);
	});

	it('add method should create a new user', async () => {
		const mockUser = {
			id: 1,
			email: 'test@example.com',
			role: 'USER',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		mockPrismaClient.user.create.mockResolvedValue(mockUser);

		const userData = {
			email: 'test@example.com',
			password: 'password',
		};

		const user = await userRepository.add(userData);

		expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
			data: userData,
			select: {
				id: true,
				email: true,
				createdAt: true,
				updatedAt: true,
				role: true,
			},
		});
		expect(user).toEqual(mockUser);
	});

	it('getById method should retrieve a user by ID', async () => {
		const mockUser = {
			id: 1,
			email: 'test@example.com',
			role: 'USER',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

		const user = await userRepository.getById(1);

		expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
			where: { id: 1 },
			select: {
				id: true,
				email: true,
				createdAt: true,
				updatedAt: true,
				role: true,
			},
		});
		expect(user).toEqual(mockUser);
	});

	it('update method should update a user', async () => {
		const mockUser = {
			id: 1,
			email: 'test@example.com',
			role: 'USER',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		mockPrismaClient.user.update.mockResolvedValue(mockUser);

		const userData = {
			email: 'newtest@example.com',
		};

		const user = await userRepository.update(1, userData);

		expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
			where: { id: 1 },
			data: userData,
		});
		expect(user).toEqual(mockUser);
	});

	it('delete method should delete a user', async () => {
		const mockUser = {
			id: 1,
			email: 'test@example.com',
			role: 'USER',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		mockPrismaClient.user.delete.mockResolvedValue(mockUser);

		const result = await userRepository.delete(1);

		expect(mockPrismaClient.user.delete).toHaveBeenCalledWith({
			where: { id: 1 },
		});
		expect(result).toEqual(mockUser);
	});

	it('list method should list all users', async () => {
		const mockUsers = [
			{
				id: 1,
				email: 'test@example.com',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				email: 'test2@example.com',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		mockPrismaClient.user.findMany.mockResolvedValue(mockUsers);

		const users = await userRepository.list();

		expect(mockPrismaClient.user.findMany).toHaveBeenCalledWith({
			select: {
				id: true,
				email: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		expect(users).toEqual(mockUsers);
	});

	it('findByEmail method should find a user by email', async () => {
		const mockUser = {
			id: 1,
			email: 'test@example.com',
			password: 'password',
			createdAt: new Date(),
			updatedAt: new Date(),
			role: 'USER',
		};

		mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

		const user = await userRepository.findByEmail('test@example.com');

		expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
			where: { email: 'test@example.com' },
			select: {
				id: true,
				email: true,
				password: true,
				createdAt: true,
				updatedAt: true,
				role: true,
			},
		});
		expect(user).toEqual(mockUser);
	});
});
