import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import AppLogo from "../../components/user/AppLogo";

const SignInScreen = (props: any) => {

    const [state, setState] = useState({ email: '', password: '', errorMessage: '', loading: false } as any);

    const onLoginSuccess = () => {
        setState({...state, error: '', loading: false});
        props.navigation.navigate('Landing');
    }

    const onLoginFailure = (errorMessage: string) => {
        setState({...state, error: errorMessage, loading: false});
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

    const signInWithEmail = async() => {
        setState({...state, error: '', loading: true});

        return await firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
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

    const signInWithFacebook = async() => {
        
        try {
            await Facebook.initializeAsync('372930443838250');

            const result = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile']});

            if (result.type === 'success') {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = firebase.auth.FacebookAuthProvider.credential(result.token);
                const facebookProfileData = await firebase.auth().signInWithCredential(credential);
                onLoginSuccess();
            }
        } 
        catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    const signInWithGoogle = async() => {
        try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
        if (type === 'success') {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
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
                    placeholder="E m a i l"
                    placeholderTextColor="#B1B1B1"
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={state.email}
                    onChangeText={email => setState({...state, email })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="P a s s w o r d"
                    placeholderTextColor="#B1B1B1"
                    returnKeyType="done"
                    textContentType="newPassword"
                    secureTextEntry={true}
                    value={state.password}
                    onChangeText={password => setState({...state, password })}
                />
            </View>
            {renderLoading()}
            <Text
                style={{
                    fontSize: 14,
                    textAlign: "center",
                    color: "red",
                    width: "80%",
                    padding: 10
                }}
            >
                {state.error}
            </Text>
            {
                !state.loading 
                &&   
                <View style={{width: '86%'}}>
                    <TouchableOpacity
                        style={{marginTop: 10 }}
                        onPress={() => signInWithEmail()}>
                            <View style={styles.standardButton}>
                                <Text
                                    style={{
                                        letterSpacing: 0.5,
                                        fontSize: 16,
                                        fontWeight:'bold'
                                        }}
                                >Sign In</Text>
                            </View>                
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{marginTop: 10 }}
                        onPress={() => signInWithFacebook()}>
                        <View style={styles.button}>
                        <Text
                            style={{
                            letterSpacing: 0.5,
                            fontSize: 16,
                            color: "#FFFFFF"
                            }}
                        >
                            Continue with Facebook
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{marginTop: 10 }}
                        onPress={() => signInWithGoogle()}>
                        <View style={styles.googleButton}>
                        <Text
                            style={{
                            letterSpacing: 0.5,
                            fontSize: 16,
                            color: "#707070"
                            }}
                        >
                            Continue with Google
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}>
                        <Text
                        style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                        onPress={() => {
                            props.navigation.navigate("SignUp");
                        }}
                        >
                        Don't have an Account?
                        </Text>
                    </View>                
                </View>
            }
            </KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "86%",
    marginTop: 15
  },
  logo: {
    marginTop: 20
  },
  input: {
    fontSize: 14,
    borderColor: "#707070",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5
  },
  button: {
    backgroundColor: "#3A559F",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070"
  }
});

SignInScreen.navigationOptions = (navData: any) => {
    /*
    return ({
        headerTitle: `Sign In`,                   
    })*/
        
};  

export default SignInScreen;