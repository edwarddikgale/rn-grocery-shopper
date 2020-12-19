import Product from '../../models/product';
import {IAction} from './action.interface';
import thunk from 'redux-thunk';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_START = 'ADD_PRODUCT_START';
export const ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';

export const addProductStart = (): {type: string, payload: boolean} => {
    return {
        type: ADD_PRODUCT_START, 
        payload: true
    }
}

export const addProductSuccess = (payload: Product): {type: string, payload: Product} => {
    return {
        type: ADD_PRODUCT_SUCCESS, 
        payload: payload
    }
}

export const addProductFailure = (payload: string): {type: string, payload: string} => {
    return {
        type: ADD_PRODUCT_FAIL, 
        payload: payload
    }
}

export const addProduct = (uid: string, payload: Product): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(addProductStart());

        const userPath = `products/${uid}`;
        console.log('dispatching add product');

        return getFirebase()
            .ref(userPath)
            .push(payload)
            .then(() => {
                console.log('success add product');
                dispatch(addProductSuccess(payload))
            })
            .catch((err:any) => {
                console.log('failed add product ' + err);
                dispatch(addProductFailure(err))  
            })
        
    }
}