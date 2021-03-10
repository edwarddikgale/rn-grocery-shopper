export default interface Product{
    id: string;
    ownerId: string;
    title: string;
    imageUrl: string;
    description: string;
    price:number;
    category:string;
    stockPercentage: number;
    lastUpdated: Date
}


