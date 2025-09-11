import type { IProduct } from "../../types/data-types";
import { api } from "../../utils/api-utils";

export const ProductsService = {
    async getAll(): Promise<IProduct[]> {
        const response = await api.get('/products');
        return response.data;
    },

    async getById(id: number): Promise<IProduct> {
        const response = await api.get(`/products/${id}`);
        return response.data
    },

    async getByCategory(category: string) {
        const response = await api.get(`products/category/${category}`);
        return response.data
    },
}