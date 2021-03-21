import ProductCategory from '../../models/ProductCategory';
import {IAction} from './action.interface';
import thunk from 'redux-thunk';
import Generator from '../../utils/guid.generator';

export const ADD_PRODUCT_CATEGORY = 'ADD_PRODUCT_CATEGORY';
export const ADD_PRODUCT_CATEGORY_START = 'ADD_PRODUCT_CATEGORY_START';
export const ADD_PRODUCT_CATEGORY_FAIL = 'ADD_PRODUCT_CATEGORY_FAIL';
export const ADD_PRODUCT_CATEGORY_SUCCESS = 'ADD_PRODUCT_CATEGORY_SUCCESS';

export const DELETE_PRODUCT_CATEGORY = 'DELETE_PRODUCT_CATEGORY';
export const DELETE_PRODUCT_CATEGORY_START = 'DELETE_PRODUCT_CATEGORY_START';
export const DELETE_PRODUCT_CATEGORY_FAIL = 'DELETE_PRODUCT_CATEGORY_FAIL';
export const DELETE_PRODUCT_CATEGORY_SUCCESS = 'DELETE_PRODUCT_CATEGORY_SUCCESS';

export const GET_PRODUCT_CATEGORYS = 'GET_PRODUCT_CATEGORYS';
export const GET_PRODUCT_CATEGORYS_START = 'GET_PRODUCT_CATEGORYS_START';
export const GET_PRODUCT_CATEGORYS_FAIL = 'GET_PRODUCT_CATEGORYS_FAIL';
export const GET_PRODUCT_CATEGORYS_SUCCESS = 'GET_PRODUCT_CATEGORYS_SUCCESS';

export const UPDATE_PRODUCT_CATEGORY = 'UPDATE_PRODUCT_CATEGORY';
export const UPDATE_PRODUCT_CATEGORY_START = 'UPDATE_PRODUCT_CATEGORY_START';
export const UPDATE_PRODUCT_CATEGORY_FAIL = 'UPDATE_PRODUCT_CATEGORY_FAIL';
export const UPDATE_PRODUCT_CATEGORY_SUCCESS = 'UPDATE_PRODUCT_CATEGORY_SUCCESS';

export const UserNotAuthError = 'User not authorised';

export const addProductCategoryStart = (): {type: string, payload: boolean} => {
    return {
        type: ADD_PRODUCT_CATEGORY_START, 
        payload: true
    }
}

export const addProductCategorySuccess = (payload: ProductCategory): {type: string, payload: ProductCategory} => {
    return {
        type: ADD_PRODUCT_CATEGORY_SUCCESS, 
        payload: payload
    }
}

export const addProductCategoryFail = (payload: string): {type: string, payload: string} => {
    return {
        type: ADD_PRODUCT_CATEGORY_FAIL, 
        payload: payload
    }
}

export const getProductCategoriesStart = (payload: boolean = true): {type: string, payload: boolean} => {
    return {
        type: GET_PRODUCT_CATEGORYS_START, 
        payload: payload
    }
}

export const getProductCategoriesFail = (payload: string): {type: string, payload: string} => {
    return {
        type: GET_PRODUCT_CATEGORYS_FAIL, 
        payload: payload
    }
}

export const getProductCategoriesSuccess = (payload: ProductCategory[]): {type: string, payload: ProductCategory[]} => {
    return {
        type: GET_PRODUCT_CATEGORYS_SUCCESS, 
        payload: payload
    }
}

export const updateProductCategoryStart = (): {type: string, payload: boolean} => {
    return {
        type: UPDATE_PRODUCT_CATEGORY_START, 
        payload: true
    }
}

export const updateProductCategorySuccess = (payload: ProductCategory): {type: string, payload: ProductCategory} => {
    return {
        type: UPDATE_PRODUCT_CATEGORY_SUCCESS, 
        payload: payload
    }
}

export const updateProductCategoryFail = (payload: string): {type: string, payload: string} => {
    return {
        type: UPDATE_PRODUCT_CATEGORY_FAIL, 
        payload: payload
    }
}

export const deleteProductCategoryStart = (): {type: string, payload: boolean} => {
    return {
        type: UPDATE_PRODUCT_CATEGORY_START, 
        payload: true
    }
}

export const deleteProductCategorySuccess = (payload: string): {type: string, payload: string} => {
    return {
        type: DELETE_PRODUCT_CATEGORY_SUCCESS, 
        payload: payload
    }
}

export const deleteProductCategoryFail = (payload: string): {type: string, payload: string} => {
    return {
        type: UPDATE_PRODUCT_CATEGORY_FAIL, 
        payload: payload
    }
}


export const addProductCategory = (uid: string, payload: ProductCategory): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(addProductCategoryStart());
      if(uid){

        const userPath = `stock/${uid}/productCategories`;
        payload.id = payload.id || Generator.guid();

        return getFirebase()
            .ref(userPath)
            .push(payload)
            .then(() => {
                dispatch(addProductCategorySuccess(payload as unknown as ProductCategory))
            })
            .catch((err:any) => {
                dispatch(addProductCategoryFail(err))  
            })
        }
       else
            dispatch(getProductCategoriesFail(UserNotAuthError));    
    }
}

export const updateProductCategory = (uid: string, payload: ProductCategory): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(updateProductCategoryStart());
      if(uid){

        const userPath = `stock/${uid}/productCategories`;

        return getFirebase()
            .ref(userPath)
            .update(payload)
            .then(() => {
                dispatch(updateProductCategorySuccess(payload as unknown as ProductCategory))
            })
            .catch((err:any) => {
                dispatch(updateProductCategoryFail(err))  
            })
        }
       else
            dispatch(getProductCategoriesFail(UserNotAuthError));    
    }
}

export const deleteProductCategory = (uid: string, payload: string): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {
        
      dispatch(deleteProductCategoryStart());
      if(uid){

        const userPath = `stock/${uid}/productCategories/${payload}`;

        return getFirebase()
            .ref(userPath)
            .remove()
            .then(() => {
                dispatch(deleteProductCategorySuccess(payload))
            })
            .catch((err:any) => {
                dispatch(deleteProductCategoryFail(err))  
            })
        }
       else
            dispatch(getProductCategoriesFail(UserNotAuthError));    
    }
}

export const getProductCategories = (uid:string, payload: any): any => {

    return (dispatch:any, getState: any, getFirebase: any) => {
 
        dispatch(getProductCategoriesStart());
        if(uid){
            const userPath = `stock/${uid}/productCategories`;    
            return getFirebase()
                .ref(userPath)
                .once('value', (snap: any[]) => {
                    let categories: ProductCategory[] = [];
                    snap.forEach(data => {
                        let category = data.val();
                        category.id = data.key || category.id;
                        categories.push(category)
                    });

                    dispatch(getProductCategoriesSuccess(categories));
                    

                })
                .catch((err:any) => {
                    dispatch(getProductCategoriesFail(err))  
                })
        }
        else
            dispatch(getProductCategoriesFail(UserNotAuthError));    
    }

}