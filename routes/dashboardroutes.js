import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/authMiddleware.js';

export default function DashboardRoutes(dashboardController) {

    router.get("/recent-transactions", authenticateToken, dashboardController.getRecent);
    router.get("/summary", authenticateToken, dashboardController.getSummary);
    router.get("/monthly-trends", authenticateToken, dashboardController.getMonthlyTrends); 
    return router;

}