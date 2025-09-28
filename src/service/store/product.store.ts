import type { IProduct } from "@/types/data-types";
import { create } from "zustand";
import { ProductsService } from "../api/products";

export interface IProductState {
    products: IProduct[];
    isLoading: boolean;
    error: string | null;

    fetchProducts: () => Promise<void>;
    clearError: () => void;
    isFetched: boolean;

    /* wishList */
    wishlist: IProduct[];
    addToWishlist: (product: IProduct) => void;
    removeFromWishlist: (productId: number) => void;
    clearWishlist: () => void;
    isWishlisted: (productId: number) => boolean;
}

export const useProductStore = create<IProductState>((set, get) => ({
    products: [],
    error: null,
    isLoading: false,
    isFetched: false,
    wishlist: [],



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

    /* wishlist */

    addToWishlist(product) {
        const currentStateWishList = get().wishlist;

        /* const avoidDuplicate = currentStateWishList.find(item => item.id === product.id);

        if (avoidDuplicate) {
            console.log('дубликат отработал!')
            return;
        } */

        set({
            wishlist: [...currentStateWishList, product]
        })
    },

    removeFromWishlist(productId) {
        set(state => ({
            wishlist: state.wishlist.filter((product) => product.id !== productId)
        }))
    },

    clearWishlist() {
        set({
            wishlist: []
        })
    },

    isWishlisted(productId) {
        return get().wishlist.some(item => item.id === productId)
    },
}))