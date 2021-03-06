export default interface Product{
    id: string;
    ownerId: string;
    title: string;
    imageUrl: string;
    description: string;
    price:number;
    category:string;
    stockPercentage: number;
    lastUpdated: number;
    lastOrderQuantity: number;
    cartQuantity: number;
    cartId?:string;
    estLiveDays: number,
    estExpiryDays: number,
    isEssential: boolean
}


