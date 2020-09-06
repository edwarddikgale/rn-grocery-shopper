import { CardItem } from "../../models/cart-item";

export const ADD_ORDER = '';

export const addOrder = (cartItems: CardItem[], totalAmount: number) => {
    return {
        type: ADD_ORDER,
        data: {items: cartItems, amount: totalAmount}
    }   
}