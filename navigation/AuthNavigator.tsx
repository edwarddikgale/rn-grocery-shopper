import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from '../screens/common/SplashScreen';
import SignUpScreen from '../screens/common/SignUpScreen';
import SignInScreen from '../screens/common/SignInScreen';
import HomeScreen from '../screens/common/HomeScreen';
import ShopNavigator from './ShopNavigator';

const AuthNavigator = createSwitchNavigator(
  {
    Loading: { screen: SplashScreen },
    SignUp: { screen: SignUpScreen },
    SignIn: { screen: SignInScreen },
    Landing: {screen: HomeScreen},
    App: ShopNavigator
  },
  { initialRouteName: 'Loading' }
);

export default createAppContainer(AuthNavigator);