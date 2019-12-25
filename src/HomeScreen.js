// Homescreen.js
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import MagazinFrameContainer from './MagazinFrameContainer';

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Dergilik AI',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer/>
            </View>
        );
    }
}
