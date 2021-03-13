import Product from '../../models/product';
import * as actionTypes from '../actions/products.actions';

import initialState, {IProductState} from '../state/product.state';

const productsReducer =  (state: IProductState = initialState, action: any) => {

    switch(action.type){

        case actionTypes.ADD_PRODUCT_SUCCESS: 
            const addedProduct:Product = {...action.payload};
            return {...state, userProducts:[...state.userProducts, addedProduct]};
        
        case actionTypes.DELETE_PRODUCT_SUCCESS: 
            const deletedProduct:Product = {...action.payload};
            return {...state, userProducts:[...state.userProducts.filter(prod => prod.id !== deletedProduct.id)]};

        case actionTypes.GET_PRODUCTS_SUCCESS:
            const products: Product[] = action.payload; 
            return {...state, userProducts: products};

        case actionTypes.UPDATE_PRODUCT_SUCCESS: 
            const updatedProd:Product = {...action.payload};
            const prodToUpdated:Product = {...state.userProducts.find(prod => prod.id === updatedProd.id) as unknown as Product, ...updatedProd};

            const unalteredList = state.userProducts.filter(prod => prod.id !== prodToUpdated.id);
            return {
                ...state, 
                userProducts:[...unalteredList, prodToUpdated]};    
            
    }   

    return state;
}

export default productsReducer;