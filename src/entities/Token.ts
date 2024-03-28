import { Role } from './User';

export interface AccessTokenPayload {
	userId: number;
	email: string;
	role: Role;
}

export interface RefreshTokenPayload {
	userId: number;
}
