// Homescreen.js
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import SignIn from './Authentication/SignIn';
import {Auth} from 'aws-amplify';

export default class HomeScreen extends Component {


    SignOut = async () => {
        await Auth.signOut();
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    title="Sign out"
                    onPress={() => this.SignOut()}
                />
            </View>
        );
    }
}
