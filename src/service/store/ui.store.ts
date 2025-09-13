import type { IAuthModalData, ICartModalData, IProduct } from '@/types/data-types';
import { create } from 'zustand';

type TModalType = 'product' | 'cart' | 'auth' | 'burger';
type TModalData = (IProduct | IAuthModalData | ICartModalData) | null;

interface IUIStore {
    isCartOpen: boolean;
    isAuthOpen: boolean;
    isProductViewOpen: boolean;
    isBurgerOpen: boolean;

    isLoading: boolean;
   // loadingKeys: Record<string, boolean>; /* пример addCart: false */
    modalData: TModalData | null;


    /* notification */
    /* notification: Notification; */


   openModal: (modalType: TModalType, data?: TModalData) => void;
   closeModal: (modalType: TModalType) => void;
}

export const useUIstore = create<IUIStore>((set) => ({
    isAuthOpen: false,
    isBurgerOpen: false,
    isCartOpen: false,
    isLoading: false,
    isProductViewOpen: false,
    modalData: null,


    openModal(modalType, data) {
        switch(modalType) {
            case 'cart':
                return set({
                    isCartOpen: true, modalData: data
                })

                case 'auth':
                return set({
                    isAuthOpen: true, modalData: data
                })

                case 'product':
                return set({
                    isProductViewOpen: true, modalData: data
                })

                case 'burger':
                    return set({
                    isBurgerOpen: true, modalData: data
                })

                default:
                    return;

        }
    },

    closeModal(modalType) {
        switch(modalType) {
            case 'cart':
                return set({
                    isCartOpen: false,
                })

                case 'auth':
                return set({
                    isAuthOpen: false
                })

                case 'product':
                return set({
                    isProductViewOpen: false
                })

                case 'burger':
                    return set({
                    isBurgerOpen: false,
                })

                default:
                    return;

        }
    },


}))

