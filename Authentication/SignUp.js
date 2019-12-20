import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Alert,
    Dimensions, Button,
} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';

Amplify.configure(aws_exports);

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cell_phone: '',
            full_name: '',
            confirmation_code: '',
            display_button: true,
        };
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    SignUp = async () => {
        try {
            const {cell_phone, full_name} = this.state;
            const success = await Auth.signUp({
                username: '+90' + cell_phone,
                password: '3424234242sdfsfs234238uds239487dfsfsf',
                attributes: {
                    name: full_name,
                },
            });
            console.log('user successfully signed up!: ', success);
            this.props.navigation.navigate('ConfirmSignIn');
        } catch (err) {
            console.log('error signing up: ', err);
            Alert.alert(err.message());
        }
    };

    render() {
        const {display_button} = this.state;

        return (
            <View style={styles.container}>
                <View display={display_button ? 'flex' : 'none'}>
                    <TextInput
                        onChangeText={(value) => this.onChangeText('full_name', value)}
                        style={styles.input}
                        placeholder="İsim Soyisim"
                        placeholderTextColor={'#434241'}
                    />

                    <TextInput
                        onChangeText={(value) => this.onChangeText('cell_phone', value)}
                        style={styles.input}
                        placeholder="Telefon numaranızı giriniz"
                        placeholderTextColor={'#434241'}
                    />
                </View>

                <Button title={'KAYIT OL'} onPress={() => this.SignUp()}/>
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
});

export default SignUp;
