import { CardItem } from "./cart-item";

export interface Order{
    id: string,
    items: {[key: string]: CardItem},
    totalAmount: number,
    date: Date,
    visible: boolean
}