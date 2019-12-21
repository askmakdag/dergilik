import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View, Alert,
    Dimensions, Button,
} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';

Amplify.configure(aws_exports);

class ConfirmSignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmation_code: '',
        };
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    isAuthenticated = async () => {
        try {
            console.log('selam');
            await Auth.currentAuthenticatedUser();
            return true;
        } catch (err) {
            console.log('error isAuthenticated: ', err.message);
            return false;
        }
    };

    answerCustomChallenge = async (AuthUser, answer) => {
        try {
            let user = await Auth.sendCustomChallengeAnswer(AuthUser, answer);
            console.log('userrr: ', user);
            return this.isAuthenticated();
        } catch (err) {
            console.log('error answerCustomChallenge: ', err.message);
        }
    };

    ConfirmSignIn = async () => {
        const {confirmation_code} = this.state;
        const AuthUser = this.props.navigation.state.params.AuthUser;

        try {
            const confirmation = confirmation_code.toString();
            const loginSucceeded = await this.answerCustomChallenge(AuthUser, confirmation);

            if (confirmation_code === '') {
                Alert.alert('Doğrulama Kodunuzu girin lütfen.');
            } else if (loginSucceeded) {
                console.log('successully confirmed!');
                this.props.navigation.navigate('HomeScreen');
            } else {
                console.log('error confirming! ');
                Alert.alert('Kod doğru değil!');
            }
        } catch (e) {
            console.log('error confirming! ', e.message);
        }

    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(value) => this.onChangeText('confirmation_code', value)}
                    style={styles.input}
                    placeholder="Tek kullanımlık kodunuzu giriniz"
                    placeholderTextColor={'#434241'}
                />

                <Button title={'DEVAM ET'} onPress={() => this.ConfirmSignIn()}/>

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
        width: Dimensions.get('window').width * 0.96,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSignUpContainer: {
        marginBottom: 40,
        marginTop: 10,
        marginHorizontal: 10,
    },
    signUpTextStyle: {
        color: '#F59432',
        fontWeight: '600',
        fontSize: 18,
    },
});

export default ConfirmSignIn;
