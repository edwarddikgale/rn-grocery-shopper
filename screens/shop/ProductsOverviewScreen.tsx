import React, {useCallback, useEffect, useState} from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IAppState } from '../../store/state/app.state';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.actions';
import * as productActions from '../../store/actions/products.actions';
import * as categoryActions from '../../store/actions/product.category.actions';
import HeaderButton from '../../components/ui/header-button';
import {DrawerActions} from 'react-navigation-drawer';
import LocalCache from '../../utils/local.cache';

const ProductsOverviewScreen = (props:any) =>{
    const {navigation} = props;
    //const products = useSelector((state: IAppState) => state.products.availableProducts);
    const products = useSelector((state: IAppState) => state.products.userProducts);
    const cartItemCount = useSelector((state: IAppState) => state.cart.count); 
    const [userId, setUserId] = useState<string>();
    
    const dispatch = useDispatch();

    let user: firebase.User;
    LocalCache.getData('user').then(data => {
        user = data;
        setUserId(user.uid);
    });

    useEffect(() => {
        if(userId) dispatch(productActions.getProducts(userId, {}));
        /*if(userId && (!categories || categories.length == 0))
            dispatch(categoryActions.getProductCategories(userId, {}));*/

    }, [userId]); 
    
    
    useEffect(() =>
        {
            navigation.setParams({
                cartLength: cartItemCount
            });
        }
    , [cartItemCount]);

    return( 
        <FlatList 
            data={products} 
            keyExtractor = {item => item.id}
            renderItem={itemData =>
                <ProductItem 
                    item={itemData.item}
                    showImage={true}
                    onViewDetails={() => { 
                        props.navigation.navigate('ProductDetails', {
                            product: JSON.stringify(itemData.item),
                            productTitle: itemData.item.title
                        })}
                    }
                    onAddToCart={()=> dispatch(cartActions.addToCart(user.uid, itemData.item))}                
                />
            } 
        />
    )    
}

ProductsOverviewScreen.navigationOptions = (navData: any) => {
    const cartLength = navData.navigation.getParam('cartLength');

    return {
        headerTitle: 'Products',
        headerRight: () => <HeaderButtons 
                HeaderButtonComponent={HeaderButton}>    
                <Item 
                    title='cart' 
                    iconName={'md-cart'} 
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
                <Text style={{color: 'white', fontSize: 10}}>{cartLength}</Text>
            </HeaderButtons>,
        headerLeft : () => <HeaderButtons 
                HeaderButtonComponent={HeaderButton}>

                <Item 
                    title='Menu' 
                    iconName={'md-menu'} 
                    onPress={() => {
                        navData.navigation.dispatch(DrawerActions.toggleDrawer());
                        //console.log(navData.navigation);
                        //navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>     
    }
}

export default ProductsOverviewScreen;