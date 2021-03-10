import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import ProductCategory from '../../models/productCategory';

export interface IProductState{
    availableProducts: Product[],
    userProducts: Product[],
    categories: ProductCategory[],
    loading: boolean,
    error: string
}

const initialState: IProductState = {
    availableProducts: PRODUCTS,
    userProducts: [],//PRODUCTS.filter(product => product.ownerId === 'u1' ),
    categories: [],
    loading: false,
    error: ''
}

export default initialState;