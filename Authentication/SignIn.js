import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    Dimensions,
    Image, TouchableOpacity,
} from 'react-native';
import {Button, CheckBox,Icon} from 'react-native-elements';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';

Amplify.configure(aws_exports);
const backgroundColor = '#FBFCFC';
import countries from '../assets/countries';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cell_phone: '',
            confirmation_code: '',
            checked: false,
            country: {name: 'turkey', code: '+90', flag: require('../assets/counrty_flags/turkey.png')},
        };
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    SignIn = async () => {
        try {
            const {cell_phone} = this.state;
            const username = '+90' + cell_phone;
            const success = await Auth.signIn({username: username});
            console.log('user successfully signed in!: ', success);
            this.props.navigation.navigate('ConfirmSignIn', {AuthUser: success});
        } catch (err) {
            console.log('error signing up: ', err);
            Alert.alert('Kullanıcı bulunamadı!');
        }
    };

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text style={styles.gsmTitleTextStyle}>Gsm Numaranız</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: '#DCDDDE',
                        marginVertical: 5,
                    }}>
                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Image source={this.state.country.flag}
                                   style={{height: 26, width: 26, marginHorizontal: 5}}/>
                            <Text style={{fontSize: 13, marginRight: 5}}>{this.state.country.code}</Text>
                            <Icon
                                name='sort-down'
                                type='font-awesome'
                                size={13}
                                containerStyle={{marginBottom:5,marginRight:5}}
                                color='#2A2A2A' />
                        </TouchableOpacity>

                        <TextInput
                            onChangeText={(value) => this.onChangeText('cell_phone', value)}
                            style={styles.input}
                            placeholder="Telefon numaranızı giriniz"
                            placeholderTextColor={'#434241'}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>

                <View style={styles.checkBoxOuterContainer}>
                    <CheckBox
                        center
                        title='Numaramı Hatırla'
                        checked={this.state.checked}
                        containerStyle={styles.checkBoxContainerStyle}
                        onPress={() => this.setState({checked: !this.state.checked})}
                    />
                </View>
                <View style={styles.buttonsContainerStyle}>
                    <Button title={'Giriş Yap'} onPress={() => this.SignIn()} buttonStyle={styles.signInButtonStyle}/>
                    <Button title={'Kayıt Ol'} onPress={() => this.props.navigation.navigate('SignUp')}
                            buttonStyle={styles.signUpButtonStyle} titleStyle={styles.signUpButtonTittleStyle}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        marginVertical: '20%',
    },
    input: {
        textAlign: 'left',
        padding: 5,
        height: 50,
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
        backgroundColor: '#F2F3F4',
        width: Dimensions.get('window').width * 0.75,
        borderWidth: 1.5,
        borderColor: '#D7DBDD',
    },
    buttonsContainerStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 15,
    },
    gsmTitleTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
        marginVertical: 10,
        marginLeft: 4,
    },
    gsmContainer: {
        flexDirection: 'column',
    },
    signInButtonStyle: {
        width: Dimensions.get('window').width * 0.92,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#0497EC',
    },
    signUpButtonStyle: {
        backgroundColor: backgroundColor,
        marginTop: 10,
    },
    signUpButtonTittleStyle: {
        color: '#0497EC',
        fontSize: 16,
        fontWeight: '400',
    },
    checkBoxOuterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        marginVertical: 15,
    },
    checkBoxContainerStyle: {
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
    },
    imageStyle: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.4,
    },
});

export default SignIn;
