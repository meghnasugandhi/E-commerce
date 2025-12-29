// E-commerce/Backend/services/db.service.js
import mysql from 'mysql2/promise';
// FIXED: Changed from './config/db.config.js' to '../config/db.config.js'

import config from '../config/db.config.js'; 

// Create a connection pool to manage simultaneous database connections efficiently
const pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE, // 'ecommerce'
    port: config.PORT,
    waitForConnections: true, // Will wait for an available connection if none are free
    connectionLimit: 10,      // Max number of simultaneous connections
    queueLimit: 0             // No limit on the queue for connection requests
});

console.log(`[DB Service] Pool initialized for database: ${config.DATABASE}`);

/**
 * Executes a SQL query using the connection pool.
 * @param {string} sql - The SQL query string.
 * @param {Array<any>} [params] - Optional parameters to be safely escaped in the query.
 * @returns {Promise<Array<Object>>} - The resulting rows from the database.
 */
export async function query(sql, params = []) {
    try {
        // pool.execute is preferred over pool.query as it uses prepared statements 
        // which helps prevent SQL injection.
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error("❌ Database query failed:", error.message);
        // Rethrow the error so the calling function (the route) can handle the failure
        throw new Error("Database operation failed.");
    }
}