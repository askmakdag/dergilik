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
import ArticleComponent from './src/ArticleComponent';

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
    ArticleComponent: {
        screen: ArticleComponent,
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

const tabSize = 29;
const MainTabs = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={tabSize} color={tintColor}/>
            ),
        },
    },
    Magazines: {
        screen: MagazinesdStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: ({tintColor}) => (
                <Icon name="book-open" size={tabSize} color={tintColor}/>
            ),
        },
    },
    NewsPapers: {
        screen: NewspapersStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: ({tintColor}) => (
                <Icon name="newspaper" size={tabSize} color={tintColor}/>
            ),
        },
    },
    Saved: {
        screen: SavedStack,
        navigationOptions: {
            headerBackTitle: 'Geri',
            tabBarIcon: ({tintColor}) => (
                <Icon name="arrow-circle-down" size={tabSize} color={tintColor}/>
            ),
        },
    },
}, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: generalSettings.buttonColor,
        inactiveTintColor: 'grey',
    },
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
