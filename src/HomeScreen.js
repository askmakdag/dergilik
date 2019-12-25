// Homescreen.js
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import SignIn from '../Authentication/SignIn';
import {Auth} from 'aws-amplify';
import axios from 'axios';
import MagazinFrameContainer from './MagazinFrameContainer';

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Dergilik AI',
    };

    /*SignOut = async () => {
        await Auth.signOut();
        this.props.navigation.navigate('SignIn');
    };*/

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer/>
            </View>
        );
    }
}
