import {ADD_TO_CART, CLEAR_CART} from '../actions/cart.actions';
import Product from '../../models/product';
import {CardItem} from '../../models/cart-item';
import ProductItem from '../../components/shop/ProductItem';
import initialState, {ICartState} from '../state/cart.state';

export default (state: ICartState = initialState, action: any) => {
    switch(action.type){
        case ADD_TO_CART:  
            const addedProduct:Product = {...action.payload};

            if(state.items[addedProduct.id]){
                const currentCartItem = {...state.items[addedProduct.id]};
                const updatedCartItem = {
                    ...currentCartItem, 
                    quantity: currentCartItem.quantity + 1,
                    total: currentCartItem.total + addedProduct.price
                };

                return {
                    ...state,
                    items:{
                        ...state.items,
                        [addedProduct.id]: updatedCartItem       
                    },
                    totalAmount: state.totalAmount + addedProduct.price,
                    count: state.count + 1
                }
            }
            else{
                const newCartItem:CardItem = {
                    title: addedProduct.title,
                    price: addedProduct.price,
                    quantity: 1,
                    total: addedProduct.price 
                };
                
                return {
                    ...state,
                    items:{...state.items, [addedProduct.id]: newCartItem},
                    totalAmount: state.totalAmount + addedProduct.price,
                    count: state.count + 1
                }
            }   
        case CLEAR_CART:
            return initialState
    }
    return state;
}