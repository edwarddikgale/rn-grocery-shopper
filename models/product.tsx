export default interface Product{
    id: string;
    ownerId: string;
    title: string;
    imageUrl: string;
    description: string;
    price:number;
    category:string;
}

export interface IProductCategory{
    id: string,
    title: string
}