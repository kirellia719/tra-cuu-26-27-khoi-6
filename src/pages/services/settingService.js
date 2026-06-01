import api from "../api/axiosInstance";
import getRandomApi from "./getAPI";

export const settingService = {
  // =========================
  // GET SETTINGS
  // =========================
  getSettings: async () => {
    try {
      const res = await api.get(`${getRandomApi()}/tuyen-sinh-api/settings`);

      const data = res.data;

      return {
        ...data,
      };
    } catch (error) {
      throw error.response?.data || "Lỗi khi lấy cấu hình hệ thống";
    }
  },

  // =========================
  // UPDATE SETTINGS
  // =========================
  updateSettings: async (data) => {
    try {
      const payload = {};

      // ===== Toggle =====
      if (typeof data.isSearchEnabled !== "undefined") {
        payload.isSearchEnabled = data.isSearchEnabled;
      }

      // ===== Cutoff =====
      if (typeof data.cutoffScoreGrade6 !== "undefined") {
        payload.cutoffScoreGrade6 = data.cutoffScoreGrade6;
      }
      if (typeof data.cutoffScoreGrade10 !== "undefined") {
        payload.cutoffScoreGrade10 = data.cutoffScoreGrade10;
      }

      const res = await api.post(`${getRandomApi()}/tuyen-sinh-api/settings`, payload);

      return res.data;
    } catch (error) {
      throw error.response?.data || "Lỗi khi cập nhật cấu hình";
    }
  },
};