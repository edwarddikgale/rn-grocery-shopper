import React, {useEffect, useState} from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, Button, TouchableWithoutFeedback, Dimensions } from 'react-native';
import firebase from 'firebase';
import LocalCache from '../../utils/local.cache';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = (props: any) => {
  const [user, setUser] = useState({} as any);

  //props.navigation.navigate('App');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user != null) {
        setUser(user);
        await LocalCache.storeData('user', user);
      }
    })
  });

    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back, {user? user.displayName: ''}</Text>
        <View style={styles.actions}>
            <TouchableWithoutFeedback onPress={()=> { props.navigation.navigate('Signout'); }}>
              <View style={styles.action}>
                  <Ionicons name='ios-log-out' color={'red'} size={28} /> 
                  <Text>Leave</Text>
              </View>
            </TouchableWithoutFeedback>  
            <TouchableWithoutFeedback onPress={()=> { props.navigation.navigate('App'); }}>
              <View style={styles.action}>
                  <Ionicons name='ios-phone-landscape' color={'green'} size={28} />
                  <Text>Continue...</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText:{
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: 20
  },
  actions:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  action:{
    width: Dimensions.get('window').width / 2 - 20,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10
  }  
});
export default HomeScreen;