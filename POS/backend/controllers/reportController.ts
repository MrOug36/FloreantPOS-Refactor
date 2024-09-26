// backend/controllers/reportController.ts

import { Request, Response } from 'express';
import reportService from '../services/reportService';

class ReportController {
  // Get sales report
  async getSalesReport(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const report = await reportService.generateSalesReport(startDate as string, endDate as string);
      res.status(200).json({ report });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get inventory report
  async getInventoryReport(req: Request, res: Response) {
    try {
      const report = await reportService.generateInventoryReport();
      res.status(200).json({ report });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get performance metrics
  async getPerformanceMetrics(req: Request, res: Response) {
    try {
      const metrics = await reportService.generatePerformanceMetrics();
      res.status(200).json({ metrics });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get custom report
  async getCustomReport(req: Request, res: Response) {
    try {
      const { type, parameters } = req.body;
      const report = await reportService.generateCustomReport(type, parameters);
      res.status(200).json({ report });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new ReportController();
