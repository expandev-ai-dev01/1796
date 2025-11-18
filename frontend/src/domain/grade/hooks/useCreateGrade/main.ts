import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeService } from '../../services';
import type { CreateGradeDTO } from '../../types';

export const useCreateGrade = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateGradeDTO>({
    mutationFn: (newGrade) => gradeService.create(newGrade),
    onSuccess: () => {
      // Invalidate and refetch grades list if it exists
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
    onError: (error: any) => {
      console.error('Error creating grade:', error);
    },
  });
};
