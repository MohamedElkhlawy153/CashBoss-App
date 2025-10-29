import { sql } from '../config/db.js';

// get all transactions for a specific user
export async function getTransactionsByUserId(req, res) {
    try {
        const { userId } = req.params;

        const transactions = await sql`
          SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.status(200).json(transactions);

    } catch (error) {
        console.error("Error getting the transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Create a new transaction
export async function createTransaction(req, res) {
    try {
            const { user_id, title, amount, category } = req.body;
    
            if (!user_id || !title || !amount || !category) {
                return res.status(400).json({ error: "All fields are required" });
            }
    
            const transaction = await sql`
              INSERT INTO transactions (user_id, title, amount, category)
              VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;
    
            console.log("Transaction created:", transaction);
            res.status(201).json(transaction[0]);
    
    
        } catch (error) { 
            console.error("Error creating transaction:", error);
            res.status(500).json({ error: "Internal server error" });
        }
};   


// Delete a transaction by ID
export async function deleteTransaction(req, res) {
    try {
            const { id } = req.params;
    
            if (isNaN(parseInt(id))) {
                return res.status(400).json({ error: "Invalid transaction ID" });
            }
    
            const result = await sql`
              DELETE FROM transactions WHERE id = ${id} RETURNING *`;
            if (result.length === 0) {
                return res.status(404).json({ error: "Transaction not found" });
            }
            res.status(200).json({ message: "Transaction deleted successfully" });
    
        } catch (error) {
            console.error("Error deleting the transaction:", error);
            res.status(500).json({ error: "Internal server error" });
        }
};
    

// Get summary (balance, income, expense) for a specific user
export async function getSummaryByUserId(req, res) {    
    try {
        const { userId } = req.params;

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance
            FROM transactions
            WHERE user_id = ${userId} `;

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income
            FROM transactions
            WHERE user_id = ${userId} AND amount > 0`;   
            
        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expense
            FROM transactions
            WHERE user_id = ${userId} AND amount < 0`;    

        res.status(200).json({
            balance: parseFloat(balanceResult[0].balance),
            income: parseFloat(incomeResult[0].income),
            expense: parseFloat(expenseResult[0].expense)
        });
    } catch (error) {
        console.error("Error getting summary:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};        


