import Product from '../../models/product';
import {IAction} from './action.interface';
import thunk from 'redux-thunk';

interface ICartAction extends IAction{
    (payload: Product): {type: string, payload: Product}
}

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

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

export const addToCartFailure = (payload: string): {type: string, payload: string} => {
    return {
        type: ADD_TO_CART_SUCCESS, 
        payload: payload
    }
}

export const addToCart = (uid: string, payload: Product): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(addToCartStart()); 
      const cartPath = `cart/${uid}`;

      return getFirebase()
        .ref(cartPath)
        .push(payload)
        .then(() => {
          dispatch(addToCartSuccess(payload))
        })
        .catch((err:any) => {
          dispatch(addToCartFailure(err))  
        })
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    };
}