import api from "./api";
import {
  DashboardStats,
  ReportsByCategory,
  ReportsByStatus,
  ReportsByMonth,
} from "../types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return api.get("/api/dashboard/stats");
  },

  async getReportsByCategory(): Promise<ReportsByCategory[]> {
    return api.get("/api/dashboard/reports-by-category");
  },

  async getReportsByStatus(): Promise<ReportsByStatus[]> {
    return api.get("/api/dashboard/reports-by-status");
  },

  async getReportsByMonth(): Promise<ReportsByMonth[]> {
    return api.get("/api/dashboard/reports-by-month");
  },
};
