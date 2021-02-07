import Product from '../../models/product';
import {IAction} from './action.interface';
import thunk from 'redux-thunk';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_START = 'ADD_PRODUCT_START';
export const ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_START = 'GET_PRODUCTS_START';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

export const addProductStart = (): {type: string, payload: boolean} => {
    return {
        type: ADD_PRODUCT_START, 
        payload: true
    }
}

export const addProductSuccess = (payload: Product[]): {type: string, payload: Product[]} => {
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

export const getProductsStart = (payload: boolean = true): {type: string, payload: boolean} => {
    return {
        type: GET_PRODUCTS_START, 
        payload: payload
    }
}

export const getProductsFail = (payload: string): {type: string, payload: string} => {
    return {
        type: GET_PRODUCTS_FAIL, 
        payload: payload
    }
}

export const getProductsSuccess = (payload: Product[]): {type: string, payload: Product[]} => {
    return {
        type: GET_PRODUCTS_SUCCESS, 
        payload: payload
    }
}


export const addProduct = (uid: string, payload: Product): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(addProductStart());

        const userPath = `stock/${uid}/products`;
        console.log('dispatching add product');

        return getFirebase()
            .ref(userPath)
            .push(payload)
            .then(() => {
                dispatch(addProductSuccess(payload))
            })
            .catch((err:any) => {
                dispatch(addProductFailure(err))  
            })
        
    }
}

export const getProducts = (uid:string, payload: any): any => {

    return (dispatch:any, getState: any, getFirebase: any) => {

        dispatch(getProductsStart());

        const userPath = `stock/${uid}/products`;    
        return getFirebase()
            .ref(userPath)
            .once('value', (snap: any[]) => {
                let products: Product[] = [];
                snap.forEach(data => {
                    let product = data.val();
                    products.push(product)
                });

                dispatch(getProductsSuccess(products));

            })
            .catch((err:any) => {
                dispatch(getProductsFail(err))  
            })
            
    }

}