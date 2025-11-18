/**
 * @summary Represents a single grade record in the system.
 */
export interface Grade {
  grade_id: string;
  student_name: string;
  subject: string;
  grade_value: number;
  created_at: string;
}

/**
 * @summary Data Transfer Object for creating a new grade.
 * The grade_value can be a string from the form input before parsing.
 */
export interface CreateGradeDTO {
  student_name: string;
  subject: string;
  grade_value: number | string;
}

/**
 * @summary Defines the structure of the API response for grade creation.
 */
export interface GradeApiResponse {
  success: boolean;
  message: string;
  data?: {
    grade_id: string;
  };
}
