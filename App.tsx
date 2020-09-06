import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products.reducer';
import cartReducer from './store/reducers/cart.reducer';
import ordersReducer from './store/reducers/orders.reducer';
import ShopNavigator from './navigation/ShopNavigator';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer 
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf')
  })
}

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(!fontsLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=> {setFontsLoaded(true)}} />
  }

  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
