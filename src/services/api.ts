import axios, { AxiosResponse } from "axios";
import type { ApiResponse } from "../types/types";

const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"]! as string;

const api = axios.create({
  baseURL: API_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export const chatAPI = {
  createSession: async (): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse = await api.post("/chat/session", {
        sessionId: null,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  getChatHistory: async (sessionId: string): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse = await api.get(
        `/chat/history/${sessionId}`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  resetChat: async (sessionId: string): Promise<ApiResponse> => {
    try {
      await api.post(`/chat/session/reset`, { sessionId });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },
};

export default api;
