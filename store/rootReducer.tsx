import productsReducer from './reducers/products.reducer';
import productCategoryReducer from './reducers/product.category.reducer';
import cartReducer from './reducers/cart.reducer';
import ordersReducer from './reducers/orders.reducer';
import { firebaseReducer } from 'react-redux-firebase'

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    products: productsReducer,
    categories: productCategoryReducer,
    cart: cartReducer,
    orders: ordersReducer,
    firebase: firebaseReducer    
});

export default rootReducer;
