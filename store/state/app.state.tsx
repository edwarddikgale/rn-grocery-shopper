import {ICartState} from './cart.state';
import {IProductState} from './product.state';
import { IOrderState } from './order.state';
import { IProductCategoryState } from './product.category.state';

export interface IAppState{
    cart: ICartState,
    products: IProductState,
    categories: IProductCategoryState,
    orders: IOrderState
}

