import { authenticatedClient } from '@/core/lib/api';
import type { CreateGradeDTO, GradeApiResponse } from '../types';

/**
 * @service gradeService
 * @summary Service for grade-related API operations.
 * @domain grade
 * @type api-service
 */
export const gradeService = {
  /**
   * @endpoint POST /api/v1/internal/grades
   * @summary Creates a new grade record.
   * @param {CreateGradeDTO} data - The grade data to create.
   * @returns {Promise<GradeApiResponse>} The API response.
   */
  async create(data: CreateGradeDTO): Promise<GradeApiResponse> {
    const response = await authenticatedClient.post<GradeApiResponse>('/grades', data);
    return response.data;
  },
};
