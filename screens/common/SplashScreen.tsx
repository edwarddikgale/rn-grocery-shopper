import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import firebase from 'firebase';
import Colors from '../../constants/Colors';

const SplashScreen = (props: any) => {

    const [animation, setAnimation] = useState<any>();
    const [nextScreen, setNextScreen] = useState<string>();
    const [progress, setProgress] = useState<any>(new Animated.Value(0));

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
          setNextScreen(user? 'App': 'SignUp')
      });
    });

    if(animation){
        animation.play(30,120);
    }

    return (
        <View style={styles.animationContainer}>
            <LottieView
                ref={animation => { setAnimation(animation);}}
                style={{
                    width: 400,
                    height: 400,
                    
                }}
                source={require('../../assets/splash.json')}
                onAnimationFinish = {() => props.navigation.navigate(nextScreen)}
                duration = {3000}
                autoPlay={true} 
                loop={false}
                // OR find more Lottie files @ https://lottiefiles.com/featured
                // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />
      </View>
    );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default SplashScreen;