export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    }
}

export type TCartItem = {
    productId: number;
    quantity: number;
}

export interface ICart {
    id: number;
    userId: number;
    date: string;
    products: TCartItem[];
    __v: number;
}

export interface IAuthModalData {
    mode: 'register' | 'login';
    email?: string;
}

export interface ICartModalData {
    promocode?: string;
}