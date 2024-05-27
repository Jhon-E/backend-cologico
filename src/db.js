import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = createPool({
  host: process.env.URL_HOST || 'localhost:4000',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME_DATABASE,
});