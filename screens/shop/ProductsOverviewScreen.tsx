import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductState } from '../../store/reducers/product.state';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props:any) =>{
    const products = useSelector((state: any) => (state.products as ProductState).availableProducts);
    return <FlatList 
        data={products} 
        keyExtractor = {item => item.id}
        renderItem={itemData =>
            <ProductItem 
                item={itemData.item}
                onViewDetails={() => { 
                   props.navigation.navigate('ProductDetails', {
                       productId: itemData.item.id,
                       productTitle: itemData.item.title
                   })}
                }
                onAddToCart={()=> {}}                
            />
        } 
        />
}

export default ProductsOverviewScreen;