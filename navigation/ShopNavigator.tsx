import React from 'react';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

const defaultNavOptions = {
    headerStyle:{
        backgroundColor: Platform.OS === 'android'? Colors.primary: ''
    },
    headerTintColor: Platform.OS === 'android'? 'white': Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen,
    Cart: CartScreen 
}, {
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},{
    defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
});

export default createAppContainer(ShopNavigator);