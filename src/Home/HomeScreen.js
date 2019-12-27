// Homescreen.js
import React, {Component} from 'react';
import {View} from 'react-native';
import MagazinFrameContainer from '../MagazinFrameContainer';

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'MAGAZINS',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer/>
            </View>
        );
    }
}
