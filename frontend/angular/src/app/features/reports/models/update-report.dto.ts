export interface UpdateReportDto {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;

  street: string;
  description: string;

  categoryId: number;
  officeId: number;
}