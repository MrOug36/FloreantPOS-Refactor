// backend/services/inventoryService.ts

import Product, { IProduct } from '../models/product';

class InventoryService {
  // Add a new product
  async addProduct(data: Partial<IProduct>): Promise<IProduct> {
    const existingProduct = await Product.findOne({ name: data.name });
    if (existingProduct) {
      throw new Error('Product already exists');
    }
    const product = new Product(data);
    return product.save();
  }

  // Get all products
  async getAllProducts(): Promise<IProduct[]> {
    return Product.find();
  }

  // Get product by ID
  async getProductById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  // Update product
  async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await Product.findByIdAndDelete(id);
  }
}

export default new InventoryService();
