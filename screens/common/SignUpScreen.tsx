import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import 'firebase/firestore';
import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import Colors from '../../constants/Colors';
import AppLogo from '../../components/user/AppLogo';

const SignUpScreen = (props: any) => {

    const[state, setState] = useState({ displayName: '', email: '', password: '', errorMessage: '', loading: false } as any);

    if(firebase.auth().currentUser){
        //user is already authenticated so just proceed
        setState({...state, error: '', loading: false});
        props.navigation.navigate('Landing');        
    }
    
    const onLoginSuccess = () => {
        props.navigation.navigate('Landing');
    }

    const onLoginFailure = (errorMessage: string)  => {
        setState({ error: errorMessage, loading: false });
    }

    if (state.loading) {
        return (
        <View>
            <ActivityIndicator size={'large'} />
        </View>
        );
    }

    const signInWithEmail = async() => {
        await firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then(onLoginSuccess)
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                onLoginFailure('Weak Password!');
            } else {
                onLoginFailure(errorMessage);
            }
        });
    }

    const renderLoading = () => {
        if (state.loading) {
        return (
            <View>
                <ActivityIndicator size={'large'} />
            </View>
        );
        }
    }

    const signInWithFacebook = async() => {
        try {
        
        const result = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        });

        if (result.type === 'success') {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const credential = firebase.auth.FacebookAuthProvider.credential(result.token);
            const facebookProfileData = await firebase.auth().signInWithCredential(credential);
            onLoginSuccess();
        }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    const signInWithGoogle = async() => {
        try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        if (type === 'success') {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const credential = firebase.auth.GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken,);
            const googleProfileData = await firebase.auth().signInWithCredential(credential);
            onLoginSuccess();
        }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    }

    return (
        <TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss();
        }}
        >
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <AppLogo />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="N a m e"
                    placeholderTextColor={Colors.lightGray}
                    returnKeyType="next"
                    textContentType="name"
                    value={state.displayName}
                    onChangeText={displayName => setState({...state, displayName })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E m a i l"
                    placeholderTextColor={Colors.lightGray}
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={state.email}
                    onChangeText={email => setState({ ...state, email })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="P a s s w o r d"
                    placeholderTextColor={Colors.lightGray}
                    returnKeyType="done"
                    textContentType="newPassword"
                    secureTextEntry={true}
                    value={state.password}
                    onChangeText={password => setState({ ...state, password })}
                />
            </View>
            {renderLoading()}
            <Text
                style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'red',
                    width: '80%'
                }}
            >
                {state.error}
            </Text>
            <TouchableOpacity
                style={{ width: '86%', marginTop: 10 }}
                onPress={() => signInWithEmail()}
            >
                <View style={styles.standardButton}>
                    <Text>Sign Up</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ width: '86%', marginTop: 10 }}
                onPress={() => signInWithFacebook()}>
                <View style={styles.button}>
                <Text
                    style={{
                        letterSpacing: 0.5,
                        fontSize: 16,
                        color: '#FFFFFF'
                    }}
                >
                    Continue with Facebook
                </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{ width: '86%', marginTop: 10 }}
                onPress={() => signInWithGoogle()}>
                <View style={styles.googleButton}>
                <Text
                    style={{
                        letterSpacing: 0.5,
                        fontSize: 16,
                        color: '#707070'
                    }}
                >
                    Continue with Google
                </Text>
                </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
                <Text
                    style={{ fontWeight: '200', fontSize: 17, textAlign: 'center' }}
                    onPress={() => {
                        props.navigation.navigate('SignIn');
                    }}
                >
                    Already have an account?
                </Text>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '86%',
    marginTop: 15
  },
  logo: {
    marginTop: 20
  },
  input: {
    fontSize: 14,
    borderColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25
  },
  button: {
    backgroundColor: '#3A559F',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22
  },
  standardButton:{
    backgroundColor: "#ffe6e6",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#707070'
  }
});
export default SignUpScreen;