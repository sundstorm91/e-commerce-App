import type { ICart } from "@/types/data-types";
import { api } from "@/utils/api-utils";

export const CartService = {

  async getAll(): Promise<ICart[]> {
    const response = await api.get('/carts');
    return response.data;
  },


  async getById(id: number): Promise<ICart> {
    const response = await api.get(`/carts/${id}`);
    return response.data;
  },


  async getByUserId(userId: number): Promise<ICart> {
    const response = await api.get(`/carts/user/${userId}`);
    return response.data;
  },
}