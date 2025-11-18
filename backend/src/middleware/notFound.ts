/**
 * @summary
 * Middleware to handle requests for non-existent routes (404 Not Found).
 */

import { Request, Response, NextFunction } from 'express';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `The requested resource '${req.originalUrl}' was not found.`,
    },
    timestamp: new Date().toISOString(),
  });
};
