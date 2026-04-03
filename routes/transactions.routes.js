import express from 'express';
const router = express.Router()
import {authenticateToken} from '../middleware/authMiddleware.js';
import {authorizeRoles} from '../middleware/roleMiddleware.js';

export default function TransactionRoutes(transactionController) {

    router.post("/transaction", authenticateToken,authorizeRoles('ADMIN'), transactionController.create);
    router.get("/transactions", authenticateToken, transactionController.getTransactions);
    router.get("/transaction/:id", authenticateToken, transactionController.getTransactionById);
    router.put("/transaction/:id", authenticateToken, authorizeRoles('ADMIN'), transactionController.updateTransaction);
    router.delete("/transaction/:id", authenticateToken, authorizeRoles('ADMIN'), transactionController.deleteTransaction);

    return router;

}
