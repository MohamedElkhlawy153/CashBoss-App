import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

// create a sql connection using our DATABASE_URL from .env file
export const sql = neon(process.env.DATABASE_URL);


// function to initialize the database and create the transactions table if it doesn't exist
export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

        console.log("Database initialized successfully and table ensured.");
    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1); // status code 1 indicates failure and 0 success
    }
}