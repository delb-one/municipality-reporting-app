import api from "./api";
import { Status } from "../types";

export const statusesService = {
  async getAll(): Promise<Status[]> {
    return api.get("/api/statuses");
  },
};
