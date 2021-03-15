import React from 'react';
import {Dimensions, Platform} from 'react-native';
import Colors from '../constants/Colors';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import ProductsManagerNavigator from './ProductTabNavigator';
import SignInScreen from '../screens/common/SignInScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    defaultNavigationOptions: {...defaultNavOptions, headerTitle : 'Shop'}
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},{
    defaultNavigationOptions: defaultNavOptions
});

const AuthNavigator = createStackNavigator({
    SignIn: SignInScreen
},{
    defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: { 
        screen: ProductsNavigator, 
        navigationOptions : () => (
            {
                title: 'Shop',
                drawerIcon: (
                    <Ionicons name={'md-cart'} size={24} />
                  ),
            }
        )
    },    
    Orders: {
        screen: OrdersNavigator,
        navigationOptions : () => (
            {
                title: 'Order History',
                drawerIcon: (
                    <Ionicons name={'md-book'} size={24} />
                  ),
            }
        )        
    },
    ManageProducts: {
        screen: ProductsManagerNavigator,
        navigationOptions : () => (
            {
                title: 'Manage Stock',
                drawerIcon: (
                    <Ionicons name={'md-settings'} size={24} />
                  ),
            }
        )        
    },
    SignOut: {
        screen: AuthNavigator,
        navigationOptions : () => (
            {
                title: 'Sign Out',
                drawerIcon: (
                    <Ionicons name={'ios-log-out'} size={24} />
                  ),
            }
        )        
    }

}, {
    navigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: 'white'
        },
    
      },
      contentOptions: {
        // add your styling here 
        activeTintColor: '#e91e63',
        itemsContainerStyle: {
          marginVertical: 30,
          marginHorizontal: 10,
        },
        iconContainerStyle: {
          opacity: 1,
        },
        labelStyle:{
            textTransform: 'uppercase'
        },
        
      },
      drawerBackgroundColor: Colors.lightGray,
      drawerWidth: Dimensions.get('window').width * 0.75   
});

export default createAppContainer(ShopNavigator);