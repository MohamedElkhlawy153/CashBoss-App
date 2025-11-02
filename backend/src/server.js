import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiterMiddleware from "./middleware/RateLimiter.js";
import transactionsRoute from "./routes/TransactionsRoute.js";
import job from "./config/cron.js";
import aiRoutes from "./routes/aiRoutes.js";

// load environment variables
dotenv.config();

// initialize express app
const app = express();

// start cron job only in production environment to avoid multiple triggers during development
if (process.env.NODE_ENV === "production") job.start();

// middleware
app.use(express.json());
app.use(rateLimiterMiddleware);

const PORT = process.env.PORT || 5001; // default to 5001 if PORT not specified

// health check route to verify server is running
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// routes to handle transactions
app.use("/api/transactions", transactionsRoute);

// routes to handle AI functionalities
app.use("/api/ai", aiRoutes);

// initialize the database and then start the server
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});    


