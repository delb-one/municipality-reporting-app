import api from "./api";
import { Office } from "../types";

export const officesService = {
  async getAll(): Promise<Office[]> {
    return api.get("/api/offices");
  },
};
