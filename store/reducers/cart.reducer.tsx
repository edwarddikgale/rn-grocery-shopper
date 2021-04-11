import * as actionTypes from '../actions/cart.actions';
import Product from '../../models/product';
import {CardItem} from '../../models/cart-item';
import ProductItem from '../../components/shop/ProductItem';
import initialState, {ICartState} from '../state/cart.state';

export default (state: ICartState = initialState, action: any) => {

    let products: Product[] = [];
    let productSum = 0;
    let cartItems = {};

    const addOrUpdateCartItem = (items:{[key: string]: CardItem}, product: Product): {items:any} => {

        if(items[product.id]){

            const currentCartItem = {...items[product.id]};
            const updatedCartItem = {
                ...currentCartItem, 
                quantity: product.cartQuantity,
                total: currentCartItem.total + product.price,
                id: product.cartId
            };

            return {
                items:{
                    ...items,
                    [product.id]: updatedCartItem       
                }
            }
        }
        else{
            console.log('adding...');
            const newCartItem:CardItem = {
                title: product.title,
                price: product.price,
                quantity: 1,
                total: product.price,
                productId: product.id,
                confirm: false,
                id: product.cartId
            };
            
            return {
                items:{...items, [product.id]: newCartItem},
            }
        }
    }

    switch(action.type){

        case actionTypes.ADD_TO_CART_SUCCESS:  
            products = [action.payload];
            let productSum = 0;
            let productCount = 0
            cartItems = {...state.items};

            products.forEach(product => {
                productSum += (product.cartQuantity || 1) * product.price;
                productCount += (product.cartQuantity || 1);
                cartItems = addOrUpdateCartItem(cartItems, product).items;
            });

            return {
                ...state,
                items: {...cartItems},
                totalAmount: state.totalAmount + productSum,
                count: state.count + productCount
            };   

        case actionTypes.REMOVE_CART_ITEM_SUCCESS:

            if(state.items[action.payload]){
                const removedItem = {...state.items[action.payload]};
                delete state.items[action.payload];

                return {
                    ...state,
                    items:{
                        ...state.items      
                    },
                    totalAmount: state.totalAmount - (removedItem.quantity * removedItem.price),
                    count: state.count - removedItem.quantity
                }                
            }  

        case actionTypes.DECREMENT_CART_ITEM_SUCCESS:

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
                    totalAmount: state.totalAmount - currentCartItem.price,
                    count: state.count - 1
                }                
            } 
            
        case actionTypes.INCREMENT_CART_ITEM_SUCCESS:

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
            products = action.payload;

            productSum = 0;
            cartItems = {...state.items};
          
            products.forEach(product => {
                productSum += product.price;
                cartItems = addOrUpdateCartItem(cartItems, product).items;
            });

            return {
                ...state,
                items: {...cartItems},
                totalAmount: state.totalAmount + productSum,
                count: products.length
            };

        case actionTypes.CONFIRM_CART_ITEM_SUCCESS:

            const cartItemId = action.payload.productId;
            const currentCartItem: CardItem = { ...state.items[cartItemId], confirm: action.payload.confirm };       
            return {
                ...state,
                items: {...state.items, [cartItemId]:currentCartItem }
            };         

        case actionTypes.CLEAR_CART_SUCCESS:
            return initialState
    }
    return state;
}