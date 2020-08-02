import { CardItem } from "../../models/cart-item";

export interface ICartState{
    items: {[key: string]: CardItem},
    totalAmount: number,
    count: number
}

const initialState: ICartState = {
    items: {},
    totalAmount: 0,
    count: 0
}

export default initialState;