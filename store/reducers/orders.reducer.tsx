import { Order } from "../../models/order";
import initialState, { IOrderState} from "../state/order.state";
import * as orderActions from '../actions/orders.actions';

export default(state: IOrderState = initialState, action: any) => {
    switch(action.type){
    
        case orderActions.ADD_ORDER_SUCCESS: 
            console.log('order payload ' + JSON.stringify(action.payload));

            const newOrder = {
                id: new Date().toString(),
                items: action.payload.cartItems,
                totalAmount: action.payload.totalAmount,
                date: new Date()
            } as Order;
            
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }

    }

    return state;
}