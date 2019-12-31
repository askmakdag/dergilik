import React, {Component} from 'react';
import {View} from 'react-native';
import MagazinFrameContainer from '../MagazinFrameContainer';
import {Provider} from 'react-redux';
import configureStore from '../Store/ConfigureStore';

const store = configureStore();

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Ana Sayfa',
    };

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <MagazinFrameContainer Type={'MIX'}/>
                </View>
            </Provider>
        );
    }
}
