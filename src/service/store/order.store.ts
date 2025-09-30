import { create } from "zustand";
import type { TCartItemForUI } from "./cart.store";

export interface IOrder {
    id: string;
    date: string;
    items: TCartItemForUI[];
    total: number;
    status: 'completed' | 'pending' | 'cancelled'
}

interface IOrderState {
    orders: IOrder[];
    addOrder: (items: TCartItemForUI[]) => string;
    getOrder?: () => IOrder[];
}

export const useOrderStore = create<IOrderState>((set, get) => ({
    orders: [],

    getOrder: () => get().orders,

    addOrder(items) {
        const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

        const newOrder: IOrder = {
            id: orderNumber,
            date: new Date().toISOString(),
            items,
            status: 'completed',
            total: items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
        }

        set({
            orders: [...get().orders, newOrder]
        })
        return orderNumber;
    },

}))