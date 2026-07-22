export interface Report {
  id: string;

  practiceCode: string;

  firstname: string;

  lastname: string;

  email: string;

  phone?: string;

  description: string;

  street: string;

  categoryId: number;

  officeId: number;

  statusId: number;
}