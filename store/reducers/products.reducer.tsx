import Product from '../../models/product';
import * as actionTypes from '../actions/cart.actions';

import initialState, {IProductState} from '../state/product.state';

const productsReducer =  (state: IProductState = initialState, action: any) => {

    switch(action.type){
        case actionTypes.ADD_TO_CART_SUCCESS: 
            const addedProduct:Product = {...action.payload};
            return {...state, userProducts:[...state.userProducts, addedProduct]};
            
    }   

    return state;
}

export default productsReducer;