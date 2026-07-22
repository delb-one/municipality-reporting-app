import { environment } from "../../../environments/environments";

export const API = {
  baseUrl: environment.apiUrl,

  auth: {
    login: '/auth/login',
    me: '/auth/me',
  },

  reports: '/reports',

  categories: '/categories',

  offices: '/offices',

  statuses: '/statuses',
};