import api from '../api/axiosInstance';
import getRandomApi from './getAPI';

export const authService = {
  login: async (username, password) => {
    return api.post(`${getRandomApi()}/tuyen-sinh-api/auth/login`, { username, password });
  }
}