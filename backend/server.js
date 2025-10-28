import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("its working");
});

console.log("my port:", process.env.PORT);

// initialize the database and then start the server
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});    