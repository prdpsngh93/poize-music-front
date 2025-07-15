"use client";
import apiClient from "./client";
import { API_ROUTES } from "./routes";
import Cookies from "js-cookie";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic API methods
export const api = {
  // GET method
  get: async (url, config = {}) => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await apiClient.get(url, {
        ...config,
        headers: {
          ...authHeaders,
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST method
  post: async (url, data = {}, config = {}) => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await apiClient.post(url, data, {
        ...config,
        headers: {
          ...authHeaders,
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT method
  put: async (url, data = {}, config = {}) => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await apiClient.put(url, data, {
        ...config,
        headers: {
          ...authHeaders,
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH method
  patch: async (url, data = {}, config = {}) => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await apiClient.patch(url, data, {
        ...config,
        headers: {
          ...authHeaders,
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE method
  delete: async (url, config = {}) => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await apiClient.delete(url, {
        ...config,
        headers: {
          ...authHeaders,
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Auth-specific API methods
export const authAPI = {
  login: (credentials) => api.post(API_ROUTES.AUTH.LOGIN, credentials),

  register: (userData) => api.post(API_ROUTES.AUTH.REGISTER, userData),

  sendOTP: (data) => api.post(API_ROUTES.AUTH.SEND_OTP, data),

  resetPassword: (data) => api.post(API_ROUTES.AUTH.RESET_PASSWORD, data),

  verifyOtp: (data) => api.post(API_ROUTES.AUTH.VERIFY_OTP, data),

  // These methods will now automatically include the token
  getApi: () => api.get(API_ROUTES.USER.GET),

  updateProfile: (data) => api.patch(API_ROUTES.USER.UPDATE, data),

  postCollaboration: (data) => api.post(API_ROUTES.USER.COLLABORATION, data),
};

// Export routes for direct access if needed
export { API_ROUTES } from "./routes";
export { API_CONFIG } from "./config";
