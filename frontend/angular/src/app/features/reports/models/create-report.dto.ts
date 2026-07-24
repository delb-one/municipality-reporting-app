export interface CreateReportDto {
  firstname: string;
  lastname: string;
  email: string;
  phone: string | null;
  street: string;
  description: string;
  categoryId: number;
  officeId?: number;
  statusId: number;
  privacyConsent: boolean;
}