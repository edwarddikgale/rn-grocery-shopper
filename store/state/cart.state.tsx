import { CardItem } from "../../models/cart-item";

export interface ICartState{
    items: {[key: string]: CardItem},
    totalAmount: number,
    count: number,
    loading: boolean,
    error: string
}

const initialState: ICartState = {
    items: {},
    totalAmount: 0,
    count: 0,
    loading: false,
    error: ''
}

export default initialState;