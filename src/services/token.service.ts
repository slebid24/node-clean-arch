import jwt from 'jsonwebtoken';
import { AccessTokenPayload, RefreshTokenPayload } from 'entities/Token';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export class TokenService {
	generateAccessToken(payload: AccessTokenPayload) {
		return jwt.sign(payload, secret, { expiresIn: '15m' });
	}

	generateRefreshToken(payload: RefreshTokenPayload) {
		return jwt.sign(payload, secret, { expiresIn: '7d' });
	}

	verifyAccessToken(token: string): AccessTokenPayload {
		return jwt.verify(token, secret) as AccessTokenPayload;
	}

	verifyRefreshToken(token: string): RefreshTokenPayload {
		return jwt.verify(token, secret) as RefreshTokenPayload;
	}
}
