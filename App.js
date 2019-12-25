import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

// goes here.
import HomeScreen from './src/HomeScreen';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AuthLoadingScreen from './AuthLoadingScreen';
import ConfirmSignIn from './Authentication/ConfirmSignIn';
import MagazinFrameContainer from './src/MagazinFrameContainer';
import MagazinFrame from './src/MagazinFrame';
import MagazinComponent from './src/MagazinComponent';
import DetailsScreen from './DetailsScreen';

const AppStack = createStackNavigator({
    Home: HomeScreen,
    MagazinFrameContainer: MagazinFrameContainer,
    MagazinFrame: MagazinFrame,
    MagazinComponent: MagazinComponent,
});
const AuthStack = createStackNavigator({SignIn: SignIn, SignUp: SignUp, ConfirmSignIn: ConfirmSignIn});

const MainTabs = createBottomTabNavigator({
    Feed: {
        screen: AppStack,
        navigationOptions: {
            tabBarLabel: 'Home',
        },
    },
    Search: {
        screen: DetailsScreen,
        navigationOptions: {
            tabBarLabel: 'Detail',
        },
    },
});

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: MainTabs,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        },
    ),
);
