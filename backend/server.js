import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

const PORT = process.env.PORT || 5001; // default to 5001 if PORT not specified

// test endpoint
app.get("/", (req, res) => {
    res.send("its working");
});

// endpoint to create a new transaction
app.post("/api/transactions", async (req, res) => {
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
});   

// initialize the database and then start the server
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});    


