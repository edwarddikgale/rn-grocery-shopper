import React, {useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

const LoadingScreen = (props: any) => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate('Landing');
            } else {
                props.navigation.navigate('SignUp');
            }
        });
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
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
export default LoadingScreen;