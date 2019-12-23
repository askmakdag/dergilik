import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// goes here.
import HomeScreen from './src/HomeScreen';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AuthLoadingScreen from './AuthLoadingScreen';
import ConfirmSignIn from './Authentication/ConfirmSignIn';
import MagazinFrameContainer from './src/MagazinFrameContainer';
import MagazinFrame from './src/MagazinFrame';
import MagazinComponent from './src/MagazinComponent';

const AppStack = createStackNavigator({
    Home: HomeScreen,
    MagazinFrameContainer: MagazinFrameContainer,
    MagazinFrame: MagazinFrame,
    MagazinComponent: MagazinComponent,
});
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
