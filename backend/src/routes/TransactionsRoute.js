import express from 'express';
import {
    getTransactionsByUserId,
    createTransaction,
    deleteTransaction,
    getSummaryByUserId
} from '../controllers/transactionsController.js';

// create a router
const router = express.Router();

// endpoint to get all transactions for a specific user
router.get("/:userId", getTransactionsByUserId);
    

// endpoint to delete a transaction by id
router.delete("/:id", deleteTransaction);
    
// endpoint to create a new transaction
router.post("/", createTransaction);
    

// endpoint to get summary (balance, income, expense) for a specific user
router.get("/summary/:userId", getSummaryByUserId);
    

export default router;