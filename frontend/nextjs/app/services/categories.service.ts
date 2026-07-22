import api from "./api";
import { Category } from "../types";

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    return api.get("/api/categories");
  },
};
