import api from '../api/axiosInstance';
import getRandomApi from './getAPI';

export const candidateService = {

  getAll: async () => {
    try {
      const response = await api.get(`${getRandomApi()}/tuyen-sinh-api/candidates`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy danh sách:");
      throw error.response?.data || error.message;
    }
  },

  getOne: async (query) => {
    try {
      const response = await api.get(
        `${getRandomApi()}/tuyen-sinh-api/candidates/search/${query}`
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Thêm mới hoặc Import Excel
   * Full URL: http://localhost:5000/tuyen-sinh-api/candidates
   */
  create: async (candidateData) => {
    try {
      const response = await api.post(`${getRandomApi()}/tuyen-sinh-api/candidates`, candidateData);
      return response.data;
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:");
      throw error.response?.data || error.message;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`${getRandomApi()}/tuyen-sinh-api/candidates/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Lỗi cập nhật:");
      throw error.response?.data || error.message;
    }
  },

  /**
   * Xóa thí sinh theo ID
   * Full URL: http://localhost:5000/tuyen-sinh-api/candidates/:id
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`${getRandomApi()}/tuyen-sinh-api/candidates/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};