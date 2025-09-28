import type { IProduct, ICartItemFromApi, ICart } from "@/types/data-types";
import { create } from 'zustand';
import { useUserStore } from "./user.store";
import { CartService } from "@/api/cart";
import { ProductsService } from "@/api/products";
import { tranformIntoCartItem } from "@/utils/helpers";
import { useUIstore } from "./ui.store";

export type TCartItemForUI = Pick<IProduct, 'id' | 'title' | 'price' | 'image'>
  & Omit<ICartItemFromApi, 'productId'>;


interface ICartState {
    items: TCartItemForUI[];
    isLoading: boolean;
    userId: number | null;
    isOpen: boolean;
    error: string | null;

    loadCart:() => void;
    addItem: (product: IProduct, quantity?: number) => void;
    updateQuantity: (itemId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    total: () => number;

}

export const useCartStore = create<ICartState>((set, get) => ({
    items: [],
    isLoading: false,
    userId: null,
    isOpen: false,
    error: null,


    loadCart: async() => {
        console.log('🔹 loadCart STARTED');
        const userId = useUserStore.getState().currentUser?.id;
        console.log('🔹 userId:', userId);

        set({
            isLoading: true, error: null
        })

        if (!userId) {
            console.log('🔹 No userId - clearing cart');
            set({
                items: []
            })
            return;
        }

        try {
            console.log('🔹 Fetching cart data...');
            const cartData = await CartService.getByUserId(userId);
            console.log('🔹 cartData from API:', cartData);

            const firstCart = cartData[0];

            const transformData = await Promise.all(
                firstCart.products.map( async(item) => {
                    const productDetails = await ProductsService.getById(item.productId);

                    return {
                        id: productDetails.id,
                        title: productDetails.title,
                        price: productDetails.price,
                        image: productDetails.image,
                        quantity: Math.max(1, item.quantity || 1)
                    } as TCartItemForUI
                })
            )

            set({
                items: transformData,
                error: null,
                isLoading: false,
            })

        } catch (err) {
                const errMessage = err instanceof Error ? err.message : 'Failed to Fetch cart store';
                console.error('🔹 loadCart ERROR:', errMessage);
                set({
                    error: errMessage,
                    isLoading: false,
                })
        }
    },

    addItem: (product, quantity=1 ) => {
        const isAuth = useUserStore.getState().isAuth;

        if (!isAuth) {
                useUIstore.getState().openModal('auth', {
                    mode: 'login'
                });

            return;
        }

        const currentItems = get().items;

        const findItem = currentItems.find((item) => item.id === product.id);
        console.log(findItem)

        if (!findItem) {
            console.log('!findItem!')
            set({
            items: [...currentItems, {
                ...tranformIntoCartItem(product, quantity),
            }]
        })
        } else {
            console.log('добавляем...')
            const updatedItems = currentItems.map(item =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + quantity}
                : item
            );
            set({ items: updatedItems });
            console.log('добавили!')
        }
    },

    removeItem(productId) {
        set(state => ({
            items: state.items.filter((cartItem) => cartItem.id !== productId)
        }))
    },

    total: () => get().items.reduce((acc, curr) => acc + (curr.price * curr.quantity) , 0),

    updateQuantity(itemId, newQuantity) {
        const currentItems = get().items;

        if (newQuantity <= 0) {
            get().removeItem(itemId)
            return;
        }

        const updateItems = currentItems.map((item) => {
            return item.id === itemId
             ? {
                ...item, quantity: newQuantity
            }
            :
            item
        })

        set({
            items: updateItems
        })

    },


}))





