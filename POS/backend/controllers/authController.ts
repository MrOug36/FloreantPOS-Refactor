// backend/controllers/authController.ts

import { Request, Response } from 'express';
import userService from '../services/userService';
import jwtUtil from '../utils/jwt';
import { IUser } from '../models/user';

// Define a custom interface that extends Express.Request
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

class AuthController {
  // User Registration
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await userService.registerUser({ username, email, password });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // User Login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwtUtil.generateToken(user);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get Current User
  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user; // Now TypeScript recognizes 'user'
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();
