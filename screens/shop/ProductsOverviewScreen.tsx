import React, {useCallback} from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IAppState } from '../../store/state/app.state';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.actions';
import HeaderButton from '../../components/ui/header-button';
import {DrawerActions} from 'react-navigation-drawer';

const ProductsOverviewScreen = (props:any) =>{
    const {navigation} = props;
    const products = useSelector((state: IAppState) => state.products.availableProducts);
    const cartItemCount = useSelector((state: IAppState) => state.cart.count); 
    const dispatch = useDispatch();

    /*
    useCallback(() =>
        navigation.setParams({
            cartItemCount: cartItemCount
        })
    , [navigation])*/

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
                onAddToCart={()=> dispatch(cartActions.addToCart(itemData.item))}                
            />
        } 
        />
}

ProductsOverviewScreen.navigationOptions = (navData: any) => {
    //const cartItemCount = navData.navigation.getParam('cartItemCount');
    //const title = `Products (${cartItemCount} in Cart)`;
    return {
        headerTitle: 'Products',
        headerRight: () => <HeaderButtons 
                HeaderButtonComponent={HeaderButton}>

                <Item 
                    title='cart' 
                    iconName={'md-cart'} 
                    onPress={() => {
                        console.log('Navigate to cart...');
                        navData.navigation.navigate('Cart');
                    }}
                    />
            </HeaderButtons>,
        headerLeft : () => <HeaderButtons 
                HeaderButtonComponent={HeaderButton}>

                <Item 
                    title='Menu' 
                    iconName={'md-menu'} 
                    onPress={() => {
                        navData.navigation.dispatch(DrawerActions.toggleDrawer());
                        console.log('hello...')
                        //console.log(navData.navigation);
                        //navData.navigation.toggleDrawer();
                    }}
                    />
            </HeaderButtons>     
    }
}

export default ProductsOverviewScreen;