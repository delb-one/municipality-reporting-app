import api from "./api";
import { Report, ReportHistory } from "../types";

export type CreateReportPayload = {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string | null;
  street: string;
  description: string;
  privacyConsent: boolean;
  categoryId: number;
  statusId: number;
  officeId?: number | null;
};

export type UpdateReportStatusPayload = {
  statusId: number;
  note?: string;
};

export type AssignReportOfficePayload = {
  officeId: number | null;
};

export const reportsService = {
  async getAll(): Promise<Report[]> {
    return api.get("/api/reports");
  },

  async getById(id: string): Promise<Report> {
    return api.get(`/api/reports/${id}`);
  },

  async getByPracticeCode(code: string): Promise<Report> {
    return api.get(`/api/reports/practice/${code}`);
  },

  async getHistory(id: string): Promise<ReportHistory[]> {
    return api.get(`/api/reports/${id}/history`);
  },

  async create(payload: CreateReportPayload): Promise<Report> {
    return api.post("/api/reports", payload);
  },

  async update(id: string, payload: Partial<CreateReportPayload>): Promise<Report> {
    return api.put(`/api/reports/${id}`, payload);
  },

  async updateStatus(id: string, payload: UpdateReportStatusPayload): Promise<Report> {
    return api.patch(`/api/reports/${id}/status`, payload);
  },

  async assignOffice(id: string, payload: AssignReportOfficePayload): Promise<Report> {
    return api.patch(`/api/reports/${id}/assignment`, payload);
  },

  async remove(id: string): Promise<void> {
    return api.delete(`/api/reports/${id}`);
  },
};
