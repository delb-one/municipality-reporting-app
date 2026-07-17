export type Category = {
  id: number;
  name: string;
  description?: string | null;
};

export type Office = {
  id: number;
  name: string;
};

export type Status = {
  id: number;
  name: string;
  color: string;
};

export type ReportHistory = {
  id: string;
  reportId: string;
  statusId: number;
  note?: string | null;
  createdAt: string;
  status: Status;
};

export type Report = {
  id: string;
  practiceCode: string;
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
  createdAt: string;
  updatedAt: string;
  category: Category;
  office?: Office | null;
  status: Status;
  histories: ReportHistory[];
};

export type DashboardStats = {
  totalReports: number;
  openReports: number;
  inWorkingReports: number;
  closedReports: number;
  averageResolutionHours: number;
};

export type ReportsByCategory = {
  id: number;
  name: string;
  total: number;
};

export type ReportsByStatus = {
  id: number;
  name: string;
  color: string;
  total: number;
};

export type ReportsByMonth = {
  month: string; // YYYY-MM
  total: number;
};
