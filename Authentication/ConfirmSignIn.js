import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View, Alert,
    Dimensions,
} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';
import {Button} from 'react-native-elements';

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
                this.props.navigation.navigate('App');
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
                    keyboardType={'numeric'}
                    placeholder="Tek kullanımlık kodunuzu giriniz"
                    placeholderTextColor={'#434241'}
                />

                <Button title={'Bitir'} onPress={() => this.ConfirmSignIn()} buttonStyle={styles.buttonStyle}/>

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
        marginBottom: '10%',
    },
    input: {
        textAlign: 'left',
        padding: 5,
        height: 50,
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
        backgroundColor: '#F2F3F4',
        width: Dimensions.get('window').width * 0.96,
        borderWidth: 1.5,
        borderColor: '#D7DBDD',
    },
    buttonStyle: {
        width: Dimensions.get('window').width * 0.96,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#0497EC',
        marginVertical: 15,
    },
});

export default ConfirmSignIn;
