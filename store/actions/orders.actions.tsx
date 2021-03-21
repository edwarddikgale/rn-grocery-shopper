import { or } from "react-native-reanimated";
import { CardItem } from "../../models/cart-item";
import { Order } from "../../models/order";
import Product from "../../models/product";
import * as productActions from './products.actions';

export const ADD_ORDER = 'ADD_ORDER';
export const ADD_ORDER_START = 'ADD_ORDER_START';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAIL = 'ADD_ORDER_FAIL';

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_START = 'GET_ORDER_START';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAIL = 'GET_ORDER_FAIL';

export const UserNotAuthError = 'User not authorised';

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
      const firebase = getFirebase();
        
      const cartItems: CardItem[] = [...payload.cartItems] as unknown as CardItem[];
      const orderSummary = {totalAmount: payload.totalAmount, lastUpdated:now.getTime()};

      const orderPath = `orders/${uid}`; 
      return firebase
        .ref(orderPath)
        .push(orderSummary)
        .then((doc: string) => {
            
            const id = `${doc}`.split("/").splice(-1); //get last elem in array
            const cartItemsPath = `orders/${uid}/${id}/cartItems`;   
            cartItems.forEach(item => {
                firebase
                .ref(cartItemsPath)
                .push(item)
                .then(() => {
                    dispatch(productActions.updateProduct(uid, {
                        id: item.productId,
                        lastOrderQuantity: item.quantity, 
                        stockPercentage: 100} as Product))
                });
            });

          dispatch(addOrderSuccess(payload));

        })
        .catch((err:any) => {
          dispatch(addOrderFail(err))  
        })
    }
}

export const getOrderStart = (): {type: string, payload: boolean} => {
    return {
        type: GET_ORDER_START, 
        payload: true
    }
}

export const getOrderFail = (payload: string): {type: string, payload: string} => {
    return {
        type: GET_ORDER_FAIL, 
        payload: payload
    }
}

export const getOrderSuccess = (payload: Order[]): {type: string, payload: Order[]} => {
    
    return {
        type: GET_ORDER_SUCCESS, 
        payload: payload
    }
}

export const getOrder = (uid: string): any => {

    return (dispatch: any, getState: any, getFirebase: any) => {

      dispatch(getOrderStart()); 

      if(uid){
            const cartPath = `orders/${uid}`;   
            return getFirebase()
                .ref(cartPath)
                .once('value', (snap: any[]) => {
                    let cartItems: CardItem[] = [];
                    let order: Order = {} as Order;
                    let orders: Order[] = [];

                    snap.forEach(data => {
                        order = {id: data.key, totalAmount: data.val().totalAmount, items:{}} as Order;
                        
                        cartItems = Object.values(data.val().cartItems);
                          
                        cartItems.forEach(item => {
                            if(order.items[item.productId]){
                                order.items[item.productId].quantity += item.quantity;
                                order.items[item.productId].total += item.total;
                            }
                            else{
                                order.items[item.productId] = {...item};
                            }

                        })

                        orders.push({...order});
                    });

                    dispatch(getOrderSuccess(orders));

                })
                .catch((err:any) => {
                    dispatch(getOrderFail(err))  
                })
      }
      else
          dispatch(getOrderFail(UserNotAuthError));  
    }
}