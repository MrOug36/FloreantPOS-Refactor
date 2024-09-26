// backend/routes/inventoryRoutes.ts

import express from 'express';
import inventoryController from '../controllers/inventoryController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/', authMiddleware.verifyToken, inventoryController.addProduct);
router.get('/', authMiddleware.verifyToken, inventoryController.getAllProducts);
router.get('/:id', authMiddleware.verifyToken, inventoryController.getProductById);
router.put('/:id', authMiddleware.verifyToken, inventoryController.updateProduct);
router.delete('/:id', authMiddleware.verifyToken, inventoryController.deleteProduct);

export default router;
