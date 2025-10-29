import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiterMiddleware from "./middleware/RateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

// load environment variables
dotenv.config();

// initialize express app
const app = express();

// middleware
app.use(express.json());
app.use(rateLimiterMiddleware);

const PORT = process.env.PORT || 5001; // default to 5001 if PORT not specified

// test endpoint
app.get("/", (req, res) => { 
    res.send("its working");
});

// routes to handle transactions
app.use("/api/transactions", transactionsRoute);

// initialize the database and then start the server
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});    


