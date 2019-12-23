import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import Pdf from 'react-native-pdf';

export default class MagazinComponent extends Component {

    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: 'PDF',
    };

    render() {
        const source = {uri: '/Users/macbook/Desktop/dergilik/assets/The_Economist_USA_-_30_11_2019.pdf'}; //require('../assets/The_Economist_USA_-_30_11_2019.pdf');
        const source2 = require('../assets/The_Economist_USA_-_30_11_2019.pdf');

        return <Pdf
            source={source2}
            style={styles.pdf}
        />;
    }
}

const styles = StyleSheet.create({
    pdf: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
