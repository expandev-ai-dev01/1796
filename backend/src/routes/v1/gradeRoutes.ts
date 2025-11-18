/**
 * @summary
 * Defines routes for grade-related operations.
 */

import { Router } from 'express';
import * as gradeController from '@/api/v1/internal/grade/controller';

const router = Router();

// POST /api/v1/internal/grades
router.post('/', gradeController.createGradeHandler);

// Other grade routes (GET, PUT, DELETE) will go here in the future.

export default router;
