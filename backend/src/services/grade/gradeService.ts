/**
 * @summary
 * Service layer for Grade-related business logic.
 */

import { executeProcedure } from '@/utils/database';
import { CreateGradeDto } from './gradeTypes';

/**
 * @summary
 * Creates a new grade record in the database.
 * @param gradeData The data for the new grade.
 * @returns The newly created grade record with its ID.
 */
export const createGrade = async (gradeData: CreateGradeDto): Promise<{ id: number }> => {
  const procedureName = 'dbo.spGradeCreate';
  const params = {
    studentName: gradeData.studentName,
    subject: gradeData.subject,
    gradeValue: gradeData.gradeValue,
  };

  try {
    const result = await executeProcedure<{ id: number }>(procedureName, params);
    if (!result || result.length === 0) {
      throw new Error('Failed to create grade: No ID returned from database.');
    }
    return result[0];
  } catch (error) {
    console.error(`Error in createGrade service:`, error);
    // Re-throw the error to be handled by the controller
    throw error;
  }
};
