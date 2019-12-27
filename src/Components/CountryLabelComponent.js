import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

class CountryLabelComponent extends Component {

    render() {
        const {country, handleAction} = this.props;

        return (
            <TouchableOpacity style={styles.containerStyle} onPress={(item) => handleAction(item)}>
                <Image source={country.flag} style={styles.imageStyle}/>
                <Text style={{fontSize: 15}}>{country.name}</Text>
                <Text style={{marginLeft: 15, fontSize: 12, color: '#292929'}}>{country.code} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    imageStyle: {
        height: 32,
        width: 32,
        marginHorizontal: 15,
    },
});

export default CountryLabelComponent;
