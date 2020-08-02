import {ICartState} from './cart.state';
import {IProductState} from './product.state';

export interface IAppState{
    cart: ICartState,
    products: IProductState
}

