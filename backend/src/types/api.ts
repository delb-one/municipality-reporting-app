export type IdParams = {
  id: string;
};

export type PracticeCodeParams = {
  code: string;
};

export type ReportStatusBody = {
  statusId: number;
  note?: string;
};

export type ReportAssignmentBody = {
  officeId: number | null;
};

export type ReportInput = {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string | null;
  street: string;
  description: string;
  privacyConsent: boolean;
  categoryId: number;
  officeId?: number | null;
  statusId: number;
};

export type ReportUpdateInput = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string | null;
  street?: string;
  description?: string;
  privacyConsent?: boolean;
  categoryId?: number;
  officeId?: number | null;
};

export type CatalogInput = {
  name: string;
  description?: string | null;
};

export type StatusInput = {
  name: string;
  color: string;
};
