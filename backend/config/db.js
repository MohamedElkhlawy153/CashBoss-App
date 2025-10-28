import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

// create a sql connection using our DATABASE_URL from .env file
export const sql = neon(process.env.DATABASE_URL);

