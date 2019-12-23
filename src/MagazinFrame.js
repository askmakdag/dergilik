// Homescreen.js
import React, {Component} from 'react';
import {Dimensions, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

class MagazinFrame extends Component {
    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: 'Great',
        // other configurations
    };

    navigateToMagazin = () => {
        const {navigate} = this.props.navigation;

        navigate('MagazinComponent', {magazin: 'success'});
    };


    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.navigateToMagazin()}>
                <Text>{this.props.magazinId}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#234311',
        height: 250,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
    },
});

export default withNavigation(MagazinFrame);
