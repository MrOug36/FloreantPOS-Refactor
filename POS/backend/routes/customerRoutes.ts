// backend/routes/customerRoutes.ts

import express from 'express';
import customerController from '../controllers/customerController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/', authMiddleware.verifyToken, customerController.createCustomer);
router.get('/', authMiddleware.verifyToken, customerController.getAllCustomers);
router.get('/:id', authMiddleware.verifyToken, customerController.getCustomerById);
router.put('/:id', authMiddleware.verifyToken, customerController.updateCustomer);
router.delete('/:id', authMiddleware.verifyToken, customerController.deleteCustomer);

export default router;
