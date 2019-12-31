import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import MagazinFrameContainer from '../MagazinFrameContainer';
import configureStore from '../Store/ConfigureStore';

const store = configureStore();

class Newspapers extends Component {

    static navigationOptions = {
        title: 'Gazeteler',
    };

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <MagazinFrameContainer Type={'NEWSPAPER'}/>
                </View>
            </Provider>
        );
    }
}

export default Newspapers;
