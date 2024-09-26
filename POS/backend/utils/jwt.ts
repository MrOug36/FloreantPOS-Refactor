// backend/utils/jwt.ts

import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

interface TokenPayload {
  id: string;
  email: string;
}

class JwtUtil {
  // Generate JWT token
  generateToken(user: IUser): string {
    const payload: TokenPayload = {
      id: user._id,
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  // Verify JWT token
  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  }
}

export default new JwtUtil();
