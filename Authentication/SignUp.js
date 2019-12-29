import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Alert,
    Dimensions,
} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';
import {Button} from 'react-native-elements';

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

    navigateTo = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <View>
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
                        keyboardType={'numeric'}
                    />
                    <Button title={'Devam et'} onPress={() => this.SignUp()} buttonStyle={styles.continueButtonStyle}/>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.textContainerStyle}>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <Text style={styles.textStyle}>Devam ederseniz </Text>
                            <Text style={styles.textStyle2}>Kullanım koşulları</Text>
                        </TouchableOpacity>
                        <Text style={styles.textStyle}> 'nı kabul etmiş olursunuz.</Text>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Dimensions.get('window').width * 0.35,
        marginHorizontal: Dimensions.get('window').width * 0.2,
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
        marginVertical: 10,
    },
    textStyle2: {
        color: '#0497EC',
        fontSize: 16,
    },
    textStyle: {
        color: '#1f2020',
    },
    textContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bottomContainer: {
        marginVertical: 30,
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.96,
    },
    continueButtonStyle: {
        width: Dimensions.get('window').width * 0.96,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#0497EC',
        marginVertical: 20,
    },
});

export default SignUp;
