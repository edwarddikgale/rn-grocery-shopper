import React, {useEffect, useState} from 'react';
import { StyleSheet, TextInput, Text, View, SafeAreaView, Button } from 'react-native';
import firebase from 'firebase';
import LocalCache from '../../utils/local.cache';

const HomeScreen = (props: any) => {
  const [user, setUser] = useState({} as any);
  const [mobile, setMobile] = useState<string>('');

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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>{user.email}</Text>
          <Button title="Log Off" onPress={() => {
            firebase.auth().signOut();
          }}/>

          <View>
            <TextInput
                      style={styles.input}
                      placeholder="Mobile...."
                      placeholderTextColor="#B1B1B1"
                      value={mobile}
                      onChangeText={mobile => setMobile(mobile)}
                  />
              <Button title='SAVE' onPress={() => {
                const mobilePath = 'User/' + user.uid + '/details';
                return firebase.database().ref(mobilePath).set({
                  mobile: mobile  
                });
              }} />    

              <View style={{margin: 20}}>
                <Button  title='CONTINUE TO APP...' onPress={() =>{
                  props.navigation.navigate('App');
                }} />
              </View>

            </View>

        </View>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    fontSize: 18,
    borderColor: "#707070",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5
  },  
});
export default HomeScreen;