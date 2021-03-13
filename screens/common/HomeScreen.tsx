import React, {useEffect, useState} from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, Button } from 'react-native';
import firebase from 'firebase';
import LocalCache from '../../utils/local.cache';

const HomeScreen = (props: any) => {
  const [user, setUser] = useState({} as any);
  const [mobile, setMobile] = useState<string>('');

  //props.navigation.navigate('App');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user != null) {
        //console.log(JSON.stringify(user));
        setUser(user);
        await LocalCache.storeData('user', user);
      }
    })
  });

    return (
      <View>
        <Text>Welcome back, {user? user.email: ''}</Text>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }  
});
export default HomeScreen;