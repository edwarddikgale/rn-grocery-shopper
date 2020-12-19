import { CardItem } from "../../models/cart-item";
import { Order } from '../../models/order';

export interface IOrderState{
    orders: Order[],
    totalAmount: number,
    count: number,
    loading: boolean,
    error: string    
}

const initialState: IOrderState = {

    orders: [],
    totalAmount: 0,
    count: 0,
    loading: false,
    error: ''
}   

export default initialState;