/**
 * @summary
 * Controller for handling grade-related API requests.
 */

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { createGradeSchema } from '@/services/grade/gradeTypes';
import * as gradeService from '@/services/grade/gradeService';
import { AppError } from '@/utils/AppError';

/**
 * @summary
 * Handles the creation of a new grade.
 * Validates the request body, calls the service to create the grade,
 * and sends the appropriate HTTP response.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The Express next middleware function.
 */
export const createGradeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Validate request body
    const validatedData = createGradeSchema.parse(req.body);

    // 2. Call the service to create the grade
    const newGrade = await gradeService.createGrade(validatedData);

    // 3. Send success response
    res.status(201).json({
      success: true,
      message: 'Nota registrada com sucesso.',
      data: {
        grade_id: newGrade.id,
      },
    });
  } catch (error: any) {
    // Handle validation errors from Zod
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return next(new AppError('Validation failed', 400, JSON.stringify(validationErrors)));
    }

    // Handle potential database errors (e.g., custom errors from SP)
    if (error.number >= 50000) {
      return next(new AppError(error.message, 400, error.message));
    }

    // Pass other errors to the global error handler
    next(error);
  }
};
