import Product from '../../models/product';
import {IAction} from './action.interface';
import thunk from 'redux-thunk';
import { ICartState } from '../state/cart.state';
import { CardItem } from '../../models/cart-item';
import { updateProduct } from '../actions/products.actions';

interface ICartAction extends IAction{
    (payload: Product): {type: string, payload: Product}
}

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAIL = 'ADD_TO_CART_FAIL';

export const GET_CART = 'GET_CART';
export const GET_CART_START = 'GET_CART_START';
export const GET_CART_FAIL = 'GET_CART_FAILURE';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';

export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const REMOVE_CART_ITEM_START = 'REMOVE_CART_ITEM_START';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_FAIL = 'REMOVE_CART_ITEM_FAIL';

export const DECREMENT_CART_ITEM = 'DECREMENT_CART_ITEM';
export const DECREMENT_CART_ITEM_START = 'DECREMENT_CART_ITEM_START';
export const DECREMENT_CART_ITEM_SUCCESS = 'DECREMENT_CART_ITEM_SUCCESS';
export const DECREMENT_CART_ITEM_FAIL = 'DECREMENT_CART_ITEM_FAIL';

export const INCREMENT_CART_ITEM = 'INCREMENT_CART_ITEM';
export const INCREMENT_CART_ITEM_START = 'INCREMENT_CART_ITEM_START';
export const INCREMENT_CART_ITEM_SUCCESS = 'INCREMENT_CART_ITEM_SUCCESS';
export const INCREMENT_CART_ITEM_FAIL = 'INCREMENT_CART_ITEM_FAIL';

export const UserNotAuthError = 'User not authorised';

export const CLEAR_CART_START = 'CLEAR_CART_START';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAIL = 'CLEAR_CART_FAIL';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCartSync = (payload: Product): {type: string, payload: Product} => {
    return {
        type: ADD_TO_CART, 
        payload: payload
    }
}

export const addToCartStart = (): {type: string, payload: boolean} => {
    return {
        type: ADD_TO_CART_START, 
        payload: true
    }
}

export const addToCartSuccess = (payload: Product): {type: string, payload: Product} => {
    return {
        type: ADD_TO_CART_SUCCESS, 
        payload: payload
    }
}

export const addToCartFail = (payload: string): {type: string, payload: string} => {
    return {
        type: ADD_TO_CART_FAIL, 
        payload: payload
    }
}

export const addToCart = (uid: string, payload: Product): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(addToCartStart()); 

      //let now = new Date(new Date());
      //payload.lastUpdated = now.getTime();
      const quantity = payload.cartQuantity? payload.cartQuantity + 1: 1; 
      const product = {...payload, cartQuantity: quantity}; 

      const cartItemPath = payload.cartId? `cart/${uid}/${payload.cartId}` : `cart/${uid}`;
      const firebaseRef = getFirebase().ref(cartItemPath)
      const fbVerbFn = payload.cartId? firebaseRef.update(product) : firebaseRef.push(product);

      return fbVerbFn
        .then((data:any) => {
            product.cartId = product.cartId || data.key;
            dispatch(addToCartSuccess(product))
        })
        .catch((err:any) => {
          dispatch(addToCartFail(err))  
        })
    }
}

export const incrementCartItem = (uid: string, payload: CardItem): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(addToCartStart()); 

      const item = {...payload, quantity: payload.quantity + 1} as CardItem; 
      const product = {cartQuantity: payload.quantity + 1}; 

      const cartItemPath = `cart/${uid}/${item.id}`;
      const firebaseRef = getFirebase().ref(cartItemPath)
      const fbVerbFn = firebaseRef.update(product);

      return fbVerbFn
        .then((data:any) => {
            console.log('Updated...' + JSON.stringify(payload));
            dispatch(incrementCartItemSuccess(item.productId))
        })
        .catch((err:any) => {
          dispatch(incrementCartItemFail(err))  
        })
    }
}

export const decrementCartItem = (uid: string, payload: CardItem): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(addToCartStart()); 

      const item = {...payload, quantity: payload.quantity - 1} as CardItem; 
      const product = {cartQuantity: payload.quantity - 1}; 

      const cartItemPath = `cart/${uid}/${item.id}`;
      const firebaseRef = getFirebase().ref(cartItemPath)
      const fbVerbFn = firebaseRef.update(product);

      return fbVerbFn
        .then((data:any) => {
            dispatch(decrementCartItemSuccess(item.productId));
            if(item.quantity === 0)
                dispatch(removeCartItem(uid, payload));
        })
        .catch((err:any) => {
          dispatch(decrementCartItemFail(err))  
        })
    }
}

export const removeCartItem = (uid: string, payload: CardItem): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
       
      dispatch(removeCartItemStart(payload.id)); 
  
      const firebase = getFirebase();
       
      const cartItemPath = `cart/${uid}/${payload.id}`; 
      return firebase.ref(cartItemPath)
        .remove()
        .then(() => {
            dispatch(removeCartItemSuccess(payload.productId))
        })
        .catch((err:any) => {
          dispatch(removeCartItemFail(err))  
        })
    }
}

export const getCartStart = (): {type: string, payload: boolean} => {
    return {
        type: ADD_TO_CART_START, 
        payload: true
    }
}

export const getCartFail = (payload: string): {type: string, payload: string} => {
    return {
        type: GET_CART_FAIL, 
        payload: payload
    }
}

export const getCartSuccess = (payload: Product[]): 
    {type: string, payload: Product[]} => {
    return {
        type: GET_CART_SUCCESS, 
        payload: payload
    }
}

export const getCart = (uid: string): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(addToCartStart()); 

      dispatch(getCartStart());
      if(uid){
            const cartPath = `cart/${uid}`;   
            return getFirebase()
                .ref(cartPath)
                .once('value', (snap: any[]) => {

                    let products: Product[] = [];

                    snap.forEach(data => {
                        let product = data.val() as Product;
                        product.cartId = data.key;
                        products.push(product);
                    });

                    dispatch(getCartSuccess(products));

                })
                .catch((err:any) => {
                    dispatch(getCartFail(err))  
                })
      }
      else
          dispatch(getCartFail(UserNotAuthError));  
    }
}

export const clearCart = (uid: string) => {
    return (dispatch: any, getState: any, getFirebase: any) => {

        dispatch(clearCartStart()); 
  
        const cartItemPath = `cart/${uid}`; 
        return getFirebase()
          .ref(cartItemPath)
          .remove()
          .then(() => {
            dispatch(clearCartSuccess())
          })
          .catch((err:any) => {
            dispatch(clearCartFail(err))  
          })
      }
}

export const clearCartSuccess = () => {
    return {
        type: CLEAR_CART_SUCCESS
    };
}

export const clearCartFail = (payload: string) => {
    return {
        type: CLEAR_CART_FAIL,
        payload: payload
    };
}

export const clearCartStart = () => {
    return {
        type: CLEAR_CART_START
    };
}

export const removeCartItemSuccess = (payload: string) => {
    return {
        type: REMOVE_CART_ITEM_SUCCESS,
        payload: payload
    }
}

export const removeCartItemStart = (payload: string) => {
    return {
        type: REMOVE_CART_ITEM_START,
        payload: payload
    }
}

export const removeCartItemFail = (payload: string) => {
    return {
        type: REMOVE_CART_ITEM_FAIL,
        payload: payload
    }
}

export const decrementCartItemStart = () => {
    return {
        type: DECREMENT_CART_ITEM_START
    }
}

export const decrementCartItemSuccess = (payload: string) => {
    return {
        type: DECREMENT_CART_ITEM_SUCCESS,
        payload: payload
    }
}

export const decrementCartItemFail = (payload: string) => {
    return {
        type: DECREMENT_CART_ITEM_FAIL,
        payload: payload
    }
}

export const incrementCartItemStart = () => {
    return {
        type: INCREMENT_CART_ITEM_START
    }
}

export const incrementCartItemSuccess = (payload: string) => {
    return {
        type: INCREMENT_CART_ITEM_SUCCESS,
        payload: payload
    }
}

export const incrementCartItemFail = (payload: string) => {
    return {
        type: INCREMENT_CART_ITEM_FAIL,
        payload: payload
    }
}