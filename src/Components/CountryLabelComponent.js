import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

class CountryLabelComponent extends Component {

    render() {
        const {country, handleAction} = this.props;

        return (
            <TouchableOpacity style={styles.containerStyle} onPress={(item) => handleAction(item)}>
                <Image source={country.flag} style={styles.imageStyle}/>
                <Text style={{fontSize: 13, marginRight: 5}}>{country.code}</Text>
                <Icon
                    name='sort-down'
                    type='font-awesome'
                    size={13}
                    containerStyle={{marginBottom: 5, marginRight: 5}}
                    color='#2A2A2A'/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageStyle: {
        height: 26,
        width: 26,
        marginHorizontal: 5,
    },
});

export default CountryLabelComponent;
