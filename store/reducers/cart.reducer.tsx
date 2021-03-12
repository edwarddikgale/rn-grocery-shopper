import * as actionTypes from '../actions/cart.actions';
import Product from '../../models/product';
import {CardItem} from '../../models/cart-item';
import ProductItem from '../../components/shop/ProductItem';
import initialState, {ICartState} from '../state/cart.state';

export default (state: ICartState = initialState, action: any) => {

    const addOrUpdateCartItem = (items:{[key: string]: CardItem}, product: Product): {items:any} => {

        if(items[product.id]){
            const currentCartItem = {...items[product.id]};
            const updatedCartItem = {
                ...currentCartItem, 
                quantity: currentCartItem.quantity + 1,
                total: currentCartItem.total + product.price
            };

            return {
                items:{
                    ...items,
                    [product.id]: updatedCartItem       
                }
            }
        }
        else{
            const newCartItem:CardItem = {
                title: product.title,
                price: product.price,
                quantity: 1,
                total: product.price 
            };
            
            return {
                items:{...items, [product.id]: newCartItem},
            }
        }
    }

    switch(action.type){

        case actionTypes.ADD_TO_CART_SUCCESS:  
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

        case actionTypes.REMOVE_CART_ITEM:
            if(state.items[action.payload]){
                const removedItem = {...state.items[action.payload]};
                delete state.items[action.payload];

                return {
                    ...state,
                    items:{
                        ...state.items      
                    },
                    totalAmount: state.totalAmount - removedItem.price,
                    count: state.count + 1
                }                
            }  

        case actionTypes.DECREMENT_CART_ITEM:

            if(state.items[action.payload]){
                const cartItemId = action.payload;
                const currentCartItem: CardItem = { ...state.items[cartItemId] };
                const updatedCartItem = {
                    ...currentCartItem, 
                    quantity: currentCartItem.quantity - 1,
                    total: currentCartItem.total - currentCartItem.price
                };

                let cartItems = {...state.items};
                if(updatedCartItem.quantity <= 0){
                    delete cartItems[cartItemId];
                }
                else
                    cartItems = {...state.items, [cartItemId]: updatedCartItem}


                return {
                    ...state,
                    items: cartItems,
                    totalAmount: state.totalAmount - (updatedCartItem.quantity > 0? currentCartItem.price: 0),
                    count: state.count + 1
                }                
            } 
            
        case actionTypes.INCREMENT_CART_ITEM:

            if(state.items[action.payload]){
                const cartItemId = action.payload;
                const currentCartItem: CardItem = { ...state.items[cartItemId] };
                const updatedCartItem = {
                    ...currentCartItem, 
                    quantity: currentCartItem.quantity + 1,
                    total: currentCartItem.total + currentCartItem.price
                };

                return {
                    ...state,
                    items: {...state.items, [cartItemId]: updatedCartItem},
                    totalAmount: state.totalAmount + currentCartItem.price,
                    count: state.count + 1
                }                
            } 
                
        case actionTypes.GET_CART_SUCCESS:
            const products: Product[] = action.payload;
            let productSum = 0;
            let items = {...state.items};
          
            products.forEach(product => {
                productSum += product.price;
                items = addOrUpdateCartItem(items, product).items;
            });

            return {
                ...state,
                items: {...items},
                totalAmount: state.totalAmount + productSum,
                count: products.length
            };

        case actionTypes.CLEAR_CART:
            return initialState
    }
    return state;
}