// backend/controllers/inventoryController.ts

import { Request, Response } from 'express';
import inventoryService from '../services/inventoryService';

class InventoryController {
  // Add a new product
  async addProduct(req: Request, res: Response) {
    try {
      const productData = req.body;
      const product = await inventoryService.addProduct(productData);
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all products
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await inventoryService.getAllProducts();
      res.status(200).json({ products });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get product by ID
  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await inventoryService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update product
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedProduct = await inventoryService.updateProduct(id, updateData);
      res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete product
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await inventoryService.deleteProduct(id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new InventoryController();
