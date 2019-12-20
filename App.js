// App.js
import React from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SignUp from './Authentication/SignUp';
import SignIn from './Authentication/SignIn';
import ConfirmSignIn from './Authentication/ConfirmSignIn';
import HomeScreen from './HomeScreen';

export default class App extends React.Component {
    render() {
        return <AppContainer/>;
    }
}

const AppNavigator = createStackNavigator({
    SignIn: {
        screen: SignIn,
    },
    SignUp: {
        screen: SignUp,
    },
    ConfirmSignIn: {
        screen: ConfirmSignIn,
    },
    HomeScreen: {
        screen: HomeScreen,
    },
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
