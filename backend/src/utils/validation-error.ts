import { AppError } from './app-error';

export class ValidationError extends AppError {
  issues: string[];

  constructor(message: string, issues: string[]) {
    super(message, 400);
    this.name = 'ValidationError';
    this.issues = issues;
  }
}
