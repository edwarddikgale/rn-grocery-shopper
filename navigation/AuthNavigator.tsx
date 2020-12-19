import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoadingScreen from '../screens/common/LoadingScreen';
import SignUpScreen from '../screens/common/SignUpScreen';
import SignInScreen from '../screens/common/SignInScreen';
import HomeScreen from '../screens/common/HomeScreen';
import ShopNavigator from './ShopNavigator';

const AuthNavigator = createSwitchNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignUp: { screen: SignUpScreen },
    SignIn: { screen: SignInScreen },
    Landing: {screen: HomeScreen},
    App: ShopNavigator
  },
  { initialRouteName: 'Loading' }
);

export default createAppContainer(AuthNavigator);