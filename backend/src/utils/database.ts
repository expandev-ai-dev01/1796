/**
 * @summary
 * Database connection and query execution utility.
 * Manages the SQL Server connection pool.
 */

import sql from 'mssql';
import { config } from '@/config';

const dbConfig: sql.config = {
  server: config.db.server,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  options: {
    ...config.db.options,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool;

export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (pool && pool.connected) {
    return pool;
  }
  try {
    pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log('Database connection pool established.');
    pool.on('error', (err) => {
      console.error('Database pool error:', err);
    });
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

// Example of a query function (to be expanded upon)
export const executeQuery = async (query: string) => {
  const pool = await getPool();
  const result = await pool.request().query(query);
  return result.recordset;
};
