import type { IAuthModalData, ICartModalData, IProduct } from '@/types/data-types';
import { create } from 'zustand';

type TModalType = 'cart' | 'auth' | 'productView' | 'burger'| 'checkout';
type TModalData = (IProduct | IAuthModalData | ICartModalData) | null;

interface IUIStore {
    isCartOpen: boolean;
    isProductViewOpen: boolean;
    isBurgerOpen: boolean;
    isLoading: boolean;
    modalData: TModalData | null;
    isCheckout: boolean;
    /* auth */
    isAuthOpen: boolean;

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
    isCheckout: false,

    openModal(modalType, data) {
        switch(modalType) {

                case 'cart':
                return set({
                    isCartOpen: true, modalData: data
                })

                case 'checkout': /* ! modalData - нехватает типа! */
                    return set({
                        isCheckout: true, modalData: data
                    })

                case 'auth':
                    return set({
                    isAuthOpen: true, modalData: data
                })

                case 'productView':
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

                case 'productView':
                return set({
                    isProductViewOpen: false
                })

                case 'burger':
                    return set({
                    isBurgerOpen: false,
                })

                case 'checkout':
                    return set({
                    isCheckout: false,
                }) /* ! */

                default:
                    return;

        }
    },


}))

