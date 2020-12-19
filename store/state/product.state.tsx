import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

export interface IProductState{
    availableProducts: Product[],
    userProducts: Product[],
    loading: boolean,
    error: string
}

const initialState: IProductState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1' ),
    loading: false,
    error: ''
}

export default initialState;