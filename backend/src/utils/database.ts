/**
 * @summary
 * Database connection and query execution utility.
 * Manages the SQL Server connection pool and provides a standardized way to execute queries.
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

/**
 * @summary
 * Gets the singleton instance of the database connection pool.
 * Initializes the pool if it doesn't exist.
 * @returns A promise that resolves to the mssql ConnectionPool instance.
 */
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

/**
 * @summary
 * Executes a stored procedure with the given parameters.
 * @param procedureName The name of the stored procedure to execute.
 * @param params An object containing the parameters for the stored procedure.
 * @returns A promise that resolves to the recordset of the query result.
 */
export const executeProcedure = async <T>(
  procedureName: string,
  params: { [key: string]: any }
): Promise<T[]> => {
  const pool = await getPool();
  const request = pool.request();

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      // Basic type inference for mssql input
      const value = params[key];
      if (typeof value === 'number') {
        if (Number.isInteger(value)) {
          request.input(key, sql.Int, value);
        } else {
          request.input(key, sql.Decimal(18, 6), value); // Default decimal precision
        }
      } else if (typeof value === 'string') {
        request.input(key, sql.NVarChar, value);
      } else if (typeof value === 'boolean') {
        request.input(key, sql.Bit, value);
      } else if (value instanceof Date) {
        request.input(key, sql.DateTime2, value);
      } else {
        request.input(key, value); // Let mssql infer
      }
    }
  }

  const result = await request.execute(procedureName);
  return result.recordset;
};
