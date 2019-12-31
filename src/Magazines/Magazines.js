import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import MagazinFrameContainer from '../MagazinFrameContainer';
import configureStore from '../Store/ConfigureStore';

const store = configureStore();

class Magazines extends Component {

    static navigationOptions = {
        title: 'Dergiler',
    };

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <MagazinFrameContainer Type={'MAGAZINE'}/>
                </View>
            </Provider>
        );
    }
}

export default Magazines;
