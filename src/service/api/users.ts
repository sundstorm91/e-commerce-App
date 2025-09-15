import  { api } from "@/utils/api-utils";
import type { IUser } from "../store/user.store";

export const UserService = {
  async login(credentials: { username: string; password: string }): Promise<{ token: string }> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /* async getProfile(): Promise<IUser> {
    const response = await api.get('/users/me');
    return response.data;
  }, */

  async getUserById(id: number): Promise<IUser> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async getAllUsers(): Promise<IUser[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async updateUser(id: number, userData: Partial<IUser>): Promise<IUser> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  /* async register(userData: {
    email: string;
    username: string;
    password: string;
    name: { firstname: string; lastname: string }
  }): Promise<IUser> {
    const response = await api.post('/users', userData);
    return response.data;
  } */
};