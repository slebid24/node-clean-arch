import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash('yourPassword', 10);
	await prisma.user.create({
		data: {
			email: 'user@example.com',
			password: hashedPassword,
			role: Role.ADMIN,
		},
	});
	console.log('User created');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
