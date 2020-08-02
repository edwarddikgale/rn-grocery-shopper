import Product from '../../models/product';
import initialState, {IProductState} from '../state/product.state';

const productsReducer =  (state: IProductState = initialState, action: any) => {
    return state;
}

export default productsReducer;