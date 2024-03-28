export enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export interface User {
	id?: number;
	email: string;
	password?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	role: any;
	verificationToken?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
