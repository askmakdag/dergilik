import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import configureStore from './src/Store/ConfigureStore';
import {Provider} from 'react-redux';

const store = configureStore();

// goes here.
import HomeScreen from './src/Home/HomeScreen';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AuthLoadingScreen from './Authentication/AuthLoadingScreen';
import ConfirmSignIn from './Authentication/ConfirmSignIn';
import MagazineFrameContainer from './src/MagazineFrameContainer';
import MagazineFrame from './src/MagazineFrame';
import MagazineComponent from './src/MagazineComponent';
import Saved from './src/Saved/Saved';
import PrivacyPolicy from './Authentication/PrivacyPolicy';
import Magazines from './src/Magazines/Magazines';
import Newspapers from './src/Newspapers/Newspapers';
import Settings from './src/Settings/Settings';
import Icon from 'react-native-vector-icons/FontAwesome5';
import generalSettings from './src/generalSettings';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
    MagazineFrameContainer: {
        screen: MagazineFrameContainer,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
    MagazineFrame: {
        screen: MagazineFrame,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
    MagazineComponent: {
        screen: MagazineComponent,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
});

const AuthStack = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
    ConfirmSignIn: {
        screen: ConfirmSignIn,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
    PrivacyPolicy: {
        screen: PrivacyPolicy,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
});

const MagazinesdStack = createStackNavigator({
    Magazines: {
        screen: Magazines,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
});
const NewspapersStack = createStackNavigator({
    Newspapers: {
        screen: Newspapers,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
});
const SavedStack = createStackNavigator({
    Saved: {
        screen: Saved,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerBackTitle: 'Geri',
        },
    },
});

const MainTabs = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: () => (
                <Icon name="home" size={30} color={generalSettings.buttonColor}/>
            ),
        },
    },
    Magazines: {
        screen: MagazinesdStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: () => (
                <Icon name="book-open" size={30} color={generalSettings.buttonColor}/>
            ),
        },
    },
    NewsPapers: {
        screen: NewspapersStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: () => (
                <Icon name="newspaper" size={30} color={generalSettings.buttonColor}/>
            ),
        },
    },
    Saved: {
        screen: SavedStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: () => (
                <Icon name="download" size={30} color={generalSettings.buttonColor}/>
            ),
        },
    },
}, {
    tabBarOptions: {showLabel: false},
});

let Navigation = createAppContainer(
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

// Render the app container component with the provider around it
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        );
    }
}
