export interface Report {
  id: string;

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
