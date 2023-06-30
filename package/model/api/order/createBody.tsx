import { CartItems } from "../../cartItems";
import { ProductAndCartItem } from "../../product/product-and-cartItem";

export interface UseCreateOrderBody {
    userId?: number,
    cartItemsList?: ProductAndCartItem[],
    deliveryAddressId?: number,
    paymentId?: number,
    totalPayment: number
}