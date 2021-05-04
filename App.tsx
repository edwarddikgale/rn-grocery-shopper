import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import firebaseConfig from './config/firebase';
import 'firebase/auth';
import 'firebase/database';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store from './store/rootStore'

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf'),
    'krona-one': require('./assets/fonts/KronaOne-Regular.ttf')

  })
}

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(!fontsLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=> {setFontsLoaded(true)}} />
  }

  return (
    <Provider store={store} >
      <ReactReduxFirebaseProvider {...rrfProps}>
        {
          fontsLoaded && 
          <AuthNavigator />
        }
      </ReactReduxFirebaseProvider>
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
