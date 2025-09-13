import type { IProduct } from "@/types/data-types";
import { create } from 'zustand';

interface ICartState {
    items: IProduct[];
    userId: number | null;
    isOpen: boolean;

    addItem: (product: IProduct) => void;
    removeItem: (productId: number) => void;

    /* setUser: (userId: number) => void;
    loadCart: () => Promise<void>;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void; */
}

const useCartStore = create<ICartState>((set, get) => ({
    items: [],
    userId: null,
    isOpen: false,

    addItem(product) {
        set(state => ({
            items: [...state.items, product]
        }))
    },

    removeItem(productId) {
        set(state => ({
            items: state.items.filter((cartItem) => cartItem.id !== productId)
        }))
    },

}))

export default useCartStore;



