// backend/services/transactionService.ts

import Transaction, { ITransaction } from '../models/transaction';
import Product from '../models/product';
import mongoose from 'mongoose';

class TransactionService {
  // Create a new transaction
  async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
    // Validate and update product stock
    for (const item of data.items || []) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const transaction = new Transaction(data);
    return transaction.save();
  }

  // Get all transactions
  async getAllTransactions(): Promise<ITransaction[]> {
    return Transaction.find().populate('user').populate('items.product');
  }

  // Get transaction by ID
  async getTransactionById(id: string): Promise<ITransaction | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid transaction ID');
    }
    return Transaction.findById(id).populate('user').populate('items.product');
  }

  // Update transaction
  async updateTransaction(id: string, updateData: Partial<ITransaction>): Promise<ITransaction | null> {
    return Transaction.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('items.product');
  }

  // Delete transaction
  async deleteTransaction(id: string): Promise<void> {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    // Optionally, restore product stock
    for (const item of transaction.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    await Transaction.findByIdAndDelete(id);
  }
}

export default new TransactionService();
