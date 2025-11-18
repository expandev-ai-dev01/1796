import { useState } from 'react';
import { useCreateGrade } from '../../hooks';
import { Button } from '@/core/components/ui/Button';
import { Input } from '@/core/components/ui/Input';
import { Label } from '@/core/components/ui/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/Card';
import type { CreateGradeDTO } from '../../types';

interface FormErrors {
  student_name?: string;
  subject?: string;
  grade_value?: string;
}

export const GradeForm = () => {
  const [formData, setFormData] = useState<CreateGradeDTO>({
    student_name: '',
    subject: '',
    grade_value: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const createGradeMutation = useCreateGrade();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.student_name.trim()) {
      newErrors.student_name = 'Student name is required.';
    } else if (formData.student_name.length < 2 || formData.student_name.length > 100) {
      newErrors.student_name = 'Student name must be between 2 and 100 characters.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.length < 2 || formData.subject.length > 50) {
      newErrors.subject = 'Subject must be between 2 and 50 characters.';
    }

    const gradeValue = parseFloat(formData.grade_value as string);
    if (isNaN(gradeValue)) {
      newErrors.grade_value = 'Grade must be a number.';
    } else if (gradeValue < 0 || gradeValue > 100) {
      newErrors.grade_value = 'Grade must be between 0 and 100.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      createGradeMutation.mutate(
        { ...formData, grade_value: parseFloat(formData.grade_value as string) },
        {
          onSuccess: () => {
            setFormData({ student_name: '', subject: '', grade_value: '' });
          },
        }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Register a New Grade</CardTitle>
        <CardDescription>Fill in the details below to add a new grade.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student_name">Student Name</Label>
            <Input
              id="student_name"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              disabled={createGradeMutation.isPending}
            />
            {errors.student_name && <p className="text-sm text-red-500">{errors.student_name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Mathematics"
              disabled={createGradeMutation.isPending}
            />
            {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade_value">Grade</Label>
            <Input
              id="grade_value"
              name="grade_value"
              type="number"
              step="0.01"
              value={formData.grade_value}
              onChange={handleChange}
              placeholder="e.g., 85.50"
              disabled={createGradeMutation.isPending}
            />
            {errors.grade_value && <p className="text-sm text-red-500">{errors.grade_value}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <Button type="submit" disabled={createGradeMutation.isPending} className="w-full">
            {createGradeMutation.isPending ? 'Saving...' : 'Save Grade'}
          </Button>
          {createGradeMutation.isSuccess && (
            <p className="text-sm text-green-600">Grade registered successfully!</p>
          )}
          {createGradeMutation.isError && (
            <p className="text-sm text-red-500">
              Failed to register grade: {createGradeMutation.error.message}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
