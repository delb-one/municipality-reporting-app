import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to automatically unwrap response and handle errors
api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success === true) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || "Si è verificato un errore imprevisto";
    const errors = error.response?.data?.errors || null;
    
    return Promise.reject({
      message,
      errors,
      status: error.response?.status,
    });
  }
);

export default api;
