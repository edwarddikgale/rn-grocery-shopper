import Product from '../../models/product';
import {IAction} from './action.interface';
import thunk from 'redux-thunk';
import Generator from '../../utils/guid.generator';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_START = 'ADD_PRODUCT_START';
export const ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_START = 'DELETE_PRODUCT_START';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_START = 'GET_PRODUCTS_START';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_START = 'UPDATE_PRODUCT_START';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';

export const UserNotAuthError = 'User not authorised';

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

export const deleteProductStart = (): {type: string, payload: boolean} => {
    return {
        type: DELETE_PRODUCT_START, 
        payload: true
    }
}

export const deleteProductSuccess = (payload: Product): {type: string, payload: Product} => {
    return {
        type: DELETE_PRODUCT_SUCCESS, 
        payload: payload
    }
}

export const deleteProductFailure = (payload: string): {type: string, payload: string} => {
    return {
        type: DELETE_PRODUCT_FAIL, 
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

export const updateProductStart = (): {type: string, payload: boolean} => {
    return {
        type: UPDATE_PRODUCT_START, 
        payload: true
    }
}

export const updateProductSuccess = (payload: Product[]): {type: string, payload: Product[]} => {
    return {
        type: UPDATE_PRODUCT_SUCCESS, 
        payload: payload
    }
}

export const updateProductFailure = (payload: string): {type: string, payload: string} => {
    return {
        type: UPDATE_PRODUCT_FAIL, 
        payload: payload
    }
}


export const addProduct = (uid: string, payload: Product): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(addProductStart());
      if(uid){

        const userPath = `stock/${uid}/products`;
        console.log('dispatching add product');
        payload.id = payload.id || Generator.guid();
        
        return getFirebase()
            .ref(userPath)
            .push(payload)
            .then(() => {
                dispatch(addProductSuccess(payload as unknown as Product[]))
            })
            .catch((err:any) => {
                dispatch(addProductFailure(err))  
            })
        }
       else
            dispatch(addProductFailure(UserNotAuthError));    
    }
}

export const deleteProduct = (uid: string, payload: Product): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(addProductStart());
      if(uid){

        const userPath = `stock/${uid}/products/${payload.id}`;
        
        return getFirebase()
            .ref(userPath)
            .remove()
            .then(() => {
                dispatch(deleteProductSuccess(payload))
            })
            .catch((err:any) => {
                dispatch(deleteProductFailure(err))  
            })
        }
       else
            dispatch(deleteProductFailure(UserNotAuthError));    
    }
}


export const updateProduct = (uid: string, payload: Product): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(updateProductStart());
      if(uid){

        const path = `stock/${uid}/products/${payload.id}`;

        let now = new Date(new Date());
        payload.lastUpdated = now.getTime();
        
        return getFirebase()
            .ref(path)
            .update(payload)
            .then(() => {
                dispatch(updateProductSuccess(payload as unknown as Product[]))
            })
            .catch((err:any) => {
                dispatch(updateProductFailure(err))  
            })
        }
       else
            dispatch(updateProductFailure(UserNotAuthError));    
    }
}

export const getProducts = (uid:string, payload: any): any => {

    return (dispatch:any, getState: any, getFirebase: any) => {

        dispatch(getProductsStart());
        if(uid){
            const userPath = `stock/${uid}/products`;    
            return getFirebase()
                .ref(userPath)
                .once('value', (snap: any[]) => {
                    let products: Product[] = [];
                    snap.forEach(data => {
                        let product = data.val();
                        product.id = data.key || product.id || Generator.guid();
                        products.push(product);
                    });

                    dispatch(getProductsSuccess(products));

                })
                .catch((err:any) => {
                    dispatch(getProductsFail(err))  
                })
        }
        else
            dispatch(getProductsFail(UserNotAuthError));    
    }

}