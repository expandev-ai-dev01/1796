/**
 * @summary
 * Global error handling middleware.
 * Catches errors from route handlers and formats them into a consistent JSON response.
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.errorCode,
        message: err.message,
      },
      timestamp: new Date().toISOString(),
    });
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
    },
    timestamp: new Date().toISOString(),
  });
};
