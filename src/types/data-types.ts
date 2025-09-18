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

export interface ICartItemFromApi {
    productId: number;
    quantity: number;
}

export interface ICart {
    id: number;
    userId: number;
    date?: string;
    products: ICartItemFromApi[];
    __v?: number;
}



export interface IAuthModalData {
    mode: 'register' | 'login';
    email?: string;
}

export interface ICartModalData {
    promocode?: string;
}