import {ICartState} from './cart.state';
import {IProductState} from './product.state';
import { IOrderState } from './order.state';

export interface IAppState{
    cart: ICartState,
    products: IProductState,
    orders: IOrderState
}

