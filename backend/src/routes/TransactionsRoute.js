import express from 'express';
import {
    getTransactionsByUserId,
    createTransaction,
    deleteTransaction,
    getSummaryByUserId
} from '../controllers/transactionsController.js';

// create a router
const router = express.Router();

// endpoint to get summary (balance, income, expense) for a specific user
router.get("/summary/:userId", getSummaryByUserId);
    

// endpoint to get all transactions for a specific user
router.get("/:userId", getTransactionsByUserId);
    
// endpoint to create a new transaction
router.post("/", createTransaction);
    

// endpoint to delete a transaction by its ID
router.delete("/:id", deleteTransaction);
    

export default router;