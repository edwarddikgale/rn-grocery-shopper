import ProductCategory from '../../models/ProductCategory';
import * as actionTypes from '../actions/product.category.actions';

import initialState, {IProductCategoryState} from '../state/product.category.state';

const productCategoryReducer =  (state: IProductCategoryState = initialState, action: any) => {

    switch(action.type){
        case actionTypes.ADD_PRODUCT_CATEGORY_SUCCESS: 
            const addedCategory:ProductCategory = {...action.payload};
            return {...state, categories:[...state.categories, addedCategory]};
        
        case actionTypes.GET_PRODUCT_CATEGORYS_SUCCESS:
            const categories: ProductCategory[] = action.payload; 
            return {...state, categories: categories, userProducts: []};
            
    }   

    return state;
}

export default productCategoryReducer;