import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;
let isDbConnected = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dawit_portfolio',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Test initial connection
  const connection = await pool.getConnection();
  console.log('✅ Connected to MySQL Database successfully!');
  isDbConnected = true;
  connection.release();
} catch (error) {
  console.warn('⚠️ Could not connect to MySQL database:', error.message);
  console.warn('Backend server will serve fallback static data until MySQL is online.');
}

export { pool, isDbConnected };
