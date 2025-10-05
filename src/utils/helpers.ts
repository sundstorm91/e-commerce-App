import type { TCartItemForUI } from "@/service/store/cart.store";
import type { IProduct } from "@/types/data-types";

export const tranformIntoCartItem = (product: IProduct, quantity = 1): TCartItemForUI => {
    const { id, image, title, price } = product;

    return {
        id,
        image,
        title,
        price,
        quantity: quantity
    }
}

