// backend/routes/authRoutes.ts

import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route
router.get('/me', authMiddleware.verifyToken, authController.getCurrentUser);

export default router;
