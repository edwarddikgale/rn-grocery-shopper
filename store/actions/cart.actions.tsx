import Product from '../../models/product';
import {IAction} from './action.interface';


interface ICartAction extends IAction{
    (payload: Product): {type: string, payload: Product}
}

export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (payload: Product): {type: string, payload: Product} => {
    return {type: ADD_TO_CART, payload: payload}
}

export const clearCart = () => {
    return {type: CLEAR_CART};
}