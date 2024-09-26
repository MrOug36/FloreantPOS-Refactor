// backend/controllers/customerController.ts

import { Request, Response } from 'express';
import customerService from '../services/customerService';

class CustomerController {
  // Create a new customer profile
  async createCustomer(req: Request, res: Response) {
    try {
      const customerData = req.body;
      const customer = await customerService.createCustomer(customerData);
      res.status(201).json({ message: 'Customer profile created successfully', customer });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all customers
  async getAllCustomers(req: Request, res: Response) {
    try {
      const customers = await customerService.getAllCustomers();
      res.status(200).json({ customers });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get customer by ID
  async getCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customer = await customerService.getCustomerById(id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ customer });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update customer
  async updateCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedCustomer = await customerService.updateCustomer(id, updateData);
      res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete customer
  async deleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await customerService.deleteCustomer(id);
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new CustomerController();
