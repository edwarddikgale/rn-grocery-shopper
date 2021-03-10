import ProductCategory from '../../models/productCategory';

export interface IProductCategoryState{
    categories: ProductCategory[],
    loading: boolean,
    error: string
}

const initialState: IProductCategoryState = {
    categories: [],
    loading: false,
    error: ''
}

export default initialState;