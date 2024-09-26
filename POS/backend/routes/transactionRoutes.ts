// backend/routes/transactionRoutes.ts

import express from 'express';
import transactionController from '../controllers/transactionController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/', authMiddleware.verifyToken, transactionController.createTransaction);
router.get('/', authMiddleware.verifyToken, transactionController.getAllTransactions);
router.get('/:id', authMiddleware.verifyToken, transactionController.getTransactionById);
router.put('/:id', authMiddleware.verifyToken, transactionController.updateTransaction);
router.delete('/:id', authMiddleware.verifyToken, transactionController.deleteTransaction);

export default router;
