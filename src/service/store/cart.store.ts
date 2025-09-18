import type { IProduct, ICartItemFromApi } from "@/types/data-types";
import { create } from 'zustand';
import { useUserStore } from "./user.store";
import { CartService } from "@/api/cart";
import { ProductsService } from "@/api/products";

type TCartItemForUI = Pick<IProduct, 'id' | 'title' | 'price' | 'image'>
  & Omit<ICartItemFromApi, 'productId'>;


interface ICartState {
    items: TCartItemForUI[];
    isLoading: boolean;
    userId: number | null;
    isOpen: boolean;
    error: string | null;

    loadCart:() => void;
    addItem: (product: IProduct, quantity: number) => void;
    /* updateItem: (productId: number) => void; */
    removeItem: (productId: number) => void;


}

const useCartStore = create<ICartState>((set) => ({
    items: [],
    isLoading: false,
    userId: null,
    isOpen: false,
    error: null,


    loadCart: async() => {
        const userId = useUserStore.getState().currentUser?.id;

        set({
            isLoading: true, error: null
        })

        if (!userId) {
            set({
                items: []
            })
            return;
        }

        try {
            const cartData = await CartService.getByUserId(userId);

            const transformData = await Promise.all(
               cartData.products.map( async (item) => {
                    const productDetails = await ProductsService.getById(item.productId);
                    return {
                        id: productDetails.id,
                        title: productDetails.title,
                        price: productDetails.price,
                        image: productDetails.image,
                        quantity: item.quantity

                    }
                })
            )

            set({
                items: transformData,
                error: null,
                isLoading: false,
            })
        } catch (err) {
                const errMessage = err instanceof Error ? err.message : 'Failed to Fetch cart store';
                set({
                    error: errMessage,
                    isLoading: false,
                })
        }
    },

    addItem(product) {

    },

    removeItem(productId) {
        set(state => ({
            items: state.items.filter((cartItem) => cartItem.id !== productId)
        }))
    },

}))

export default useCartStore;



