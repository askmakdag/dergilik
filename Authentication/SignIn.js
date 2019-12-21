import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Alert,
    Dimensions, Button,
} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';

Amplify.configure(aws_exports);

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cell_phone: '',
            confirmation_code: '',
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
                <TextInput
                    onChangeText={(value) => this.onChangeText('cell_phone', value)}
                    style={styles.input}
                    placeholder="Telefon numaranızı giriniz"
                    placeholderTextColor={'#434241'}
                />

                <View style={styles.buttonsContainerStyle}>
                    <Button title={'Giriş Yap'} onPress={() => this.SignIn()}/>

                    <Button title={'Kayıt Ol'} onPress={() => this.props.navigation.navigate('SignUp')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        textAlign: 'center',
        height: 40,
        color: '#000',
        width: Dimensions.get('window').width * 0.96,
        borderBottomWidth: 0.5,
        borderWidth: 1,
        borderBottomColor: '#474646',
        margin: 10,
    },
    buttonsContainerStyle: {
        width: Dimensions.get('window').width * 0.6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default SignIn;
