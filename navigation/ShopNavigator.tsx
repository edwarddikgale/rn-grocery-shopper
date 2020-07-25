import React from 'react';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen
}, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS === 'android'? Colors.primary: ''
        },
        headerTintColor: Platform.OS === 'android'? 'white': Colors.primary
    }
});

export default createAppContainer(ProductsNavigator);