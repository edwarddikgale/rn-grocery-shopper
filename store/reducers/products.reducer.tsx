import Product from '../../models/product';
import initialState, {ProductState} from './product.state';

const productsReducer =  (state: ProductState = initialState, action: any) => {
    return state;
}

export default productsReducer;