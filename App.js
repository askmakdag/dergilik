import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';

// goes here.
import HomeScreen from './src/Home/HomeScreen';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AuthLoadingScreen from './AuthLoadingScreen';
import ConfirmSignIn from './Authentication/ConfirmSignIn';
import MagazinFrameContainer from './src/MagazinFrameContainer';
import MagazinFrame from './src/MagazinFrame';
import MagazinComponent from './src/MagazinComponent';
import Saved from './src/Saved/Saved';

const AppStack = createStackNavigator({
    Home: HomeScreen,
    MagazinFrameContainer: MagazinFrameContainer,
    MagazinFrame: MagazinFrame,
    MagazinComponent: MagazinComponent,
});
const AuthStack = createStackNavigator({SignIn: SignIn, SignUp: SignUp, ConfirmSignIn: ConfirmSignIn});
const SavedStack = createStackNavigator({Saved: Saved});

import Icon from 'react-native-vector-icons/FontAwesome';

const MainTabs = createBottomTabNavigator({
    Home: {
        screen: AppStack,
        navigationOptions: {
            tabBarLabel: 'HOME PAGE',
            tabBarIcon: () => (
                <Icon name="home" size={30} color="#0A7CA9"/>
            ),
        },
    },
    Magazines: {
        screen: SavedStack,
        navigationOptions: {
            tabBarLabel: 'MAGAZINES',
            tabBarIcon: () => (
                <Icon name="book" size={30} color="#0A7CA9"/>
            ),
        },
    },
    NewsPapers: {
        screen: AppStack,
        navigationOptions: {
            tabBarLabel: 'NEWSPAPERS',
            tabBarIcon: () => (
                <Icon name="newspaper" size={30} color="#0A7CA9"/>
            ),
        },
    },
    Saved: {
        screen: SavedStack,
        navigationOptions: {
            tabBarLabel: 'SAVED',
            tabBarIcon: () => (
                <Icon name="download" size={30} color="#0A7CA9"/>
            ),
        },
    }
}, {
    tabBarOptions: {showLabel: true},
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
