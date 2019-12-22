import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// goes here.
import HomeScreen from './HomeScreen';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AuthLoadingScreen from './AuthLoadingScreen';
import ConfirmSignIn from './Authentication/ConfirmSignIn';

const AppStack = createStackNavigator({Home: HomeScreen});
const AuthStack = createStackNavigator({SignIn: SignIn, SignUp: SignUp, ConfirmSignIn: ConfirmSignIn});

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        },
    ),
);
