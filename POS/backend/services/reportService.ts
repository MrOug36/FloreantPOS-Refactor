// backend/services/reportService.ts

import Transaction from '../models/transaction';
import Product from '../models/product';
import Customer from '../models/customer';

class ReportService {
  // Generate sales report between dates
  async generateSalesReport(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sales = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalAmount' },
          totalTransactions: { $sum: 1 },
          averageTransactionValue: { $avg: '$totalAmount' },
        },
      },
    ]);

    return sales[0] || {};
  }

  // Generate inventory report
  async generateInventoryReport() {
    const inventory = await Product.find().select('name stock category price');
    return inventory;
  }

  // Generate performance metrics
  async generatePerformanceMetrics() {
    const performance = await Transaction.aggregate([
      {
        $group: {
          _id: '$user',
          totalSales: { $sum: '$totalAmount' },
          totalTransactions: { $sum: 1 },
          averageTransactionValue: { $avg: '$totalAmount' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 0,
          userId: '$user._id',
          username: '$user.username',
          totalSales: 1,
          totalTransactions: 1,
          averageTransactionValue: 1,
        },
      },
    ]);

    return performance;
  }

  // Generate custom report based on type and parameters
  async generateCustomReport(type: string, parameters: any) {
    switch (type) {
      case 'sales':
        return this.generateSalesReport(parameters.startDate, parameters.endDate);
      case 'inventory':
        return this.generateInventoryReport();
      case 'performance':
        return this.generatePerformanceMetrics();
      default:
        throw new Error('Invalid report type');
    }
  }
}

export default new ReportService();
