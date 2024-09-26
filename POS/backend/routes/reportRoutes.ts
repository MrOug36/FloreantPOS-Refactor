// backend/routes/reportRoutes.ts

import express from 'express';
import reportController from '../controllers/reportController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Protected routes
router.get('/sales', authMiddleware.verifyToken, reportController.getSalesReport);
router.get('/inventory', authMiddleware.verifyToken, reportController.getInventoryReport);
router.get('/performance', authMiddleware.verifyToken, reportController.getPerformanceMetrics);
router.post('/custom', authMiddleware.verifyToken, reportController.getCustomReport);

export default router;
