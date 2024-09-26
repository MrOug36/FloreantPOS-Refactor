// backend/controllers/transactionController.ts

import { Request, Response } from 'express';
import transactionService from '../services/transactionService';

class TransactionController {
  // Create a new transaction
  async createTransaction(req: Request, res: Response) {
    try {
      const transactionData = req.body;
      const transaction = await transactionService.createTransaction(transactionData);
      res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all transactions
  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await transactionService.getAllTransactions();
      res.status(200).json({ transactions });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get transaction by ID
  async getTransactionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json({ transaction });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update transaction
  async updateTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTransaction = await transactionService.updateTransaction(id, updateData);
      res.status(200).json({ message: 'Transaction updated successfully', updatedTransaction });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete transaction
  async deleteTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await transactionService.deleteTransaction(id);
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new TransactionController();
