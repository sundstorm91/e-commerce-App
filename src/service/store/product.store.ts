import type { IProduct } from "@/types/data-types";
import { create } from "zustand";
import { ProductsService } from "../api/products";

export interface IProductState {
    products: IProduct[];
    isLoading: boolean;
    error: string | null;

    fetchProducts: () => Promise<void>; /* Promise<void> <void> */
    clearError: () => void;

    isFetched: boolean;
}

export const useProductStore = create<IProductState>((set, get) => ({
    products: [],
    error: null,
    isLoading: false,
    isFetched: false,


    fetchProducts: async () => {
        set({ isLoading: true, error: null})

        try {
            const products = await ProductsService.getAll();
            console.log(products)
            set({
                products: products,
                isLoading: false,
                isFetched: true,
            })

        } catch (err) {
            const errMessage = err instanceof Error ? err.message : 'Fetch product failed'
            set({
                error: errMessage,
                isLoading: false,
            })
        }
    },

    clearError: () => {
        set({
            error: null,
        })
    },
}))