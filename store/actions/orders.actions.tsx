import { CardItem } from "../../models/cart-item";
import Product from "../../models/product";
import * as productActions from './products.actions';

export const ADD_ORDER = 'ADD_ORDER';
export const ADD_ORDER_START = 'ADD_ORDER_START';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAIL = 'ADD_ORDER_FAIL';

export const addOrderSuccess = (payload: {cartItems: CardItem[], totalAmount: number}) => {
    return {
        type: ADD_ORDER_SUCCESS,
        payload: payload
    }   
}

export const addOrderStart = (payload: string) => {
    return {
        type: ADD_ORDER_START,
        payload: payload
    }   
}

export const addOrderFail = (payload: string) => {
    return {
        type: ADD_ORDER_START,
        payload: payload
    }   
}


export const addOrder = (uid: string, payload: {cartItems: CardItem[], totalAmount: number, lastUpdated?: number}): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(addOrderStart('')); 
      let now = new Date(new Date());
      payload.lastUpdated = now.getTime();

      const cartPath = `orders/${uid}`; 
      return getFirebase()
        .ref(cartPath)
        .push(payload)
        .then(() => {
          
          dispatch(addOrderSuccess(payload));
          const cartItems: CardItem[] = payload.cartItems as unknown as CardItem[];

          cartItems.forEach(item => {
              dispatch(productActions.updateProduct(uid, {
                  id: item.productId,
                  lastOrderQuantity: item.quantity, 
                  stockPercentage: 100} as Product))
          });

        })
        .catch((err:any) => {
          dispatch(addOrderFail(err))  
        })
    }
}