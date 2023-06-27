import { Product } from ".";

export interface ProductAndCartItem {
    cartItemId: number,
    quantity: number,
    product: Product
}