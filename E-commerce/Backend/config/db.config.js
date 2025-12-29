// config/db.config.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME,
  PORT: process.env.DB_PORT,
};

// CHANGE THIS LINE ONLY:
export default config;  // Remove "export const config" and use this instead