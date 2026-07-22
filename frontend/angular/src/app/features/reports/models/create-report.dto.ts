export interface CreateReportDto {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;

  street: string;
  description: string;

  categoryId: number;
  officeId: number;

  privacyConsent: boolean;
}