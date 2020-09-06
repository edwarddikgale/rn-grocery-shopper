import { Order } from "../../models/order";
import initialState, { IOrderState} from "../state/order.state";
import * as orderActions from '../actions/orders.actions';

export default(state: IOrderState = initialState, action: any) => {
    switch(action.type){
    
        case orderActions.ADD_ORDER: 
            console.log('adding order');
            
            const newOrder = {
                id: new Date().toString(),
                items: action.data.items,
                totalAmount: action.data.amount,
                date: new Date()
            } as Order;
            
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }

    }

    return state;
}