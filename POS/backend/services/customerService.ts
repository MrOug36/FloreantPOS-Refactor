// backend/services/customerService.ts

import Customer, { ICustomer } from '../models/customer';
import Transaction from '../models/transaction';
import mongoose from 'mongoose';

class CustomerService {
  // Create a new customer
  async createCustomer(data: Partial<ICustomer>): Promise<ICustomer> {
    const existingCustomer = await Customer.findOne({ email: data.email });
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }
    const customer = new Customer(data);
    return customer.save();
  }

  // Get all customers
  async getAllCustomers(): Promise<ICustomer[]> {
    return Customer.find();
  }

  // Get customer by ID
  async getCustomerById(id: string): Promise<ICustomer | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid customer ID');
    }
    return Customer.findById(id).populate('purchaseHistory.transaction');
  }

  // Update customer
  async updateCustomer(id: string, updateData: Partial<ICustomer>): Promise<ICustomer | null> {
    return Customer.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Delete customer
  async deleteCustomer(id: string): Promise<void> {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    await Customer.findByIdAndDelete(id);
  }

  // Add purchase to customer history
  async addPurchaseToCustomer(customerId: string, transactionId: string, amount: number): Promise<void> {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    customer.purchaseHistory.push({
      transaction: transactionId,
      amount,
    });
    customer.loyaltyPoints += Math.floor(amount / 10); // Example: 1 point per $10
    await customer.save();
  }
}

export default new CustomerService();
