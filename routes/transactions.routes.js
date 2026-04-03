import express from 'express';
const router = express.Router()
import {authenticateToken} from '../middleware/authMiddleware.js';
import {authorizeRoles} from '../middleware/roleMiddleware.js';

export default function TransactionRoutes(transactionController) {

    router.post("/createTransaction", authenticateToken,authorizeRoles('ADMIN'), transactionController.create);
    router.get("/getTransactions", authenticateToken, transactionController.getTransactions);
    router.get("/getTransactionById/:id", authenticateToken, transactionController.getTransactionById);
    router.put("/updateTransaction/:id", authenticateToken, authorizeRoles('ADMIN'), transactionController.updateTransaction);
    router.delete("/deleteTransaction/:id", authenticateToken, authorizeRoles('ADMIN'), transactionController.deleteTransaction);

    return router;

}