/**
 * @summary
 * Type definitions for the Grade module.
 */

import { z } from 'zod';

// Zod schema for validating the creation of a new grade
export const createGradeSchema = z.object({
  studentName: z
    .string({ required_error: 'O campo studentName é obrigatório.' })
    .trim()
    .min(2, 'O campo studentName deve ter no mínimo 2 caracteres.')
    .max(100, 'O campo studentName deve ter no máximo 100 caracteres.')
    .regex(/^[a-zA-Z' ]+$/, 'O nome do aluno deve conter apenas letras, espaços e apóstrofos.'),
  subject: z
    .string({ required_error: 'O campo subject é obrigatório.' })
    .trim()
    .min(2, 'O campo subject deve ter no mínimo 2 caracteres.')
    .max(50, 'O campo subject deve ter no máximo 50 caracteres.'),
  gradeValue: z
    .number({
      required_error: 'O campo gradeValue é obrigatório.',
      invalid_type_error: 'O valor da nota deve ser numérico.',
    })
    .min(0, 'A nota deve ser um número entre 0.00 e 100.00.')
    .max(100, 'A nota deve ser um número entre 0.00 e 100.00.')
    // Custom validation to check for max 2 decimal places
    .refine(
      (val) => {
        const decimalPart = val.toString().split('.')[1];
        return !decimalPart || decimalPart.length <= 2;
      },
      { message: 'A nota deve ter no máximo 2 casas decimais.' }
    ),
});

// TypeScript type inferred from the Zod schema
export type CreateGradeDto = z.infer<typeof createGradeSchema>;

// Represents a Grade entity as stored in the database
export interface Grade {
  id: number;
  studentName: string;
  subject: string;
  gradeValue: number;
  createdAt: Date;
}
