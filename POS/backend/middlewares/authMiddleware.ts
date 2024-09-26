// backend/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../utils/jwt';
import userService from '../services/userService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

class AuthMiddleware {
  async verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwtUtil.verifyToken(token);
      const user = await userService.getUserById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    } catch (error: any) {
      res.status(401).json({ message: 'Token is not valid', error: error.message });
    }
  }
}

export default new AuthMiddleware();
