import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProductListScreen from '../screens/user/ProductListScreen';
import CategoryListScreen from '../screens/user/CategoryListScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { createStackNavigator } from 'react-navigation-stack';

const ProductsNavigator = createStackNavigator({
  Products: ProductListScreen
});

const CategoriesNavigator = createStackNavigator({
  Categories: CategoryListScreen
});

const ProductTabNavigator =  createBottomTabNavigator({
    Products: ProductsNavigator,
    Categories: CategoriesNavigator
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Categories') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          //IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Products') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }
  }
);

export default ProductTabNavigator;