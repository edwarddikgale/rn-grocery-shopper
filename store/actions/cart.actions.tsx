import Product from '../../models/product';
import {IAction} from './action.interface';
import thunk from 'redux-thunk';
import { ICartState } from '../state/cart.state';

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
export const INCREMENT_CART_ITEM = 'INCREMENT_CART_ITEM';

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

      const cartPath = `cart/${uid}`; 
      return getFirebase()
        .ref(cartPath)
        .push(payload)
        .then(() => {
          dispatch(addToCartSuccess(payload))
        })
        .catch((err:any) => {
          dispatch(addToCartFail(err))  
        })
    }
}

export const removeCartItem = (uid: string, payload: string): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(removeCartItemStart(payload)); 

      const cartItemPath = `cart/${uid}/${payload}`; 
      return getFirebase()
        .ref(cartItemPath)
        .remove()
        .then(() => {
          dispatch(removeCartItemSuccess(payload))
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

export const getCartSuccess = (payload: Product[]): {type: string, payload: Product[]} => {
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
                        product.id = product.id || data.key;
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

export const decrementCartItem = (payload: string) => {
    return {
        type: DECREMENT_CART_ITEM,
        payload: payload
    }
}

export const incrementCartItem = (payload: string) => {
    return {
        type: INCREMENT_CART_ITEM,
        payload: payload
    }
}