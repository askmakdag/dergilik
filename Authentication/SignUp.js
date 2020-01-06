import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Alert,
    Dimensions, Image, ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';
import {Button, Icon} from 'react-native-elements';
import {countries} from '../assets/countries';
import CountryLabelComponent from '../src/Components/CountryLabelComponent';
import Modal from 'react-native-modal';

const backgroundColor = '#FBFCFC';
Amplify.configure(aws_exports);

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cell_phone: '',
            full_name: '',
            confirmation_code: '',
            modalVisible: false,
            display_button: true,
            country: countries[15],
            countriesList: [],
        };
    };

    static navigationOptions = () => {
        return {
            headerTitle: 'Kayıt ol',
        };
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    SignUp = async () => {
        const {cell_phone, full_name, country} = this.state;
        if (cell_phone === '' || full_name === '') {
            Alert.alert('Lütfen ilgili alanları doldurun.');
        } else {
            try {
                const username = country.code + cell_phone;
                const {full_name} = this.state;
                await Auth.signUp({
                    username: username,
                    password: '3424234242sdfsfs234238uds239487dfsfsf',
                    attributes: {
                        name: full_name,
                    },
                });
                const success = await Auth.signIn({username: username});
                console.log('user successfully signed up!: ', success);
                this.props.navigation.navigate('ConfirmSignIn', {AuthUser: success});
            } catch (err) {
                console.log('error signing up: ', err);
                Alert.alert(err.message());
            }
        }
    };

    componentWillMount() {
        const {countriesList} = this.state;

        countries.forEach((element) => {
            countriesList.push(
                <CountryLabelComponent country={element}
                                       handleAction={() => this.handleVisibilityModal(element)}/>);
        });
    }

    navigateTo = () => {
        this.props.navigation.navigate('PrivacyPolicy');
    };

    handleVisibilityModal = (element) => {
        this.state.modalVisible ? this.setState({modalVisible: false, country: element}) :
            this.setState({modalVisible: true, country: element});
    };

    render() {
        const {country, modalVisible} = this.state;

        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        onChangeText={(value) => this.onChangeText('full_name', value)}
                        style={styles.input}
                        placeholder="İsim Soyisim"
                        placeholderTextColor={'#434241'}
                    />

                    <View style={styles.gsmBoxContainerStyle}>
                        <TouchableOpacity style={styles.flagContainerStyle}
                                          onPress={() => this.setState({modalVisible: !modalVisible})}>
                            <Image source={country.flag} style={styles.flagImageStyle}/>
                            <Text style={{fontSize: 13, marginRight: 5}}>{country.code}</Text>
                            <Icon
                                name='sort-down'
                                type='font-awesome'
                                size={13}
                                containerStyle={{marginBottom: 5, marginRight: 5}}
                                color='#2A2A2A'/>
                        </TouchableOpacity>

                        <TextInput
                            onChangeText={(value) => this.onChangeText('cell_phone', value)}
                            style={styles.gsm_input}
                            placeholder="Gsm numaranızı giriniz"
                            placeholderTextColor={'#434241'}
                            keyboardType={'numeric'}
                            defaultValue={this.state.cell_phone}
                        />
                    </View>

                    <Button title={'Devam et'} onPress={() => this.SignUp()} buttonStyle={styles.continueButtonStyle}/>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.textContainerStyle}>
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.navigateTo()}>
                            <Text style={styles.textStyle}>Devam ederseniz </Text>
                            <Text style={styles.textStyle2}>Kullanım koşulları</Text>
                        </TouchableOpacity>
                        <Text style={styles.textStyle}> 'nı kabul etmiş olursunuz.</Text>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
                    <Modal animationType="slide"
                           transparent={true}
                           visible={this.state.modalVisible}
                           onSwipeComplete={() => this.setState({modalVisible: false})}
                           onBackdropPress={() => this.setState({modalVisible: false})}
                    >
                        <View style={styles.modalView}>
                            <ScrollView style={{width: '100%'}}>
                                <View>
                                    {this.state.countriesList}
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                </TouchableWithoutFeedback>
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
        marginHorizontal: Dimensions.get('window').width * 0.02,
    },
    gsm_input: {
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
    modalView: {
        backgroundColor: backgroundColor,
        width: Dimensions.get('window').width * 0.96,
        height: Dimensions.get('window').height * 0.7,
        alignSelf: 'center',
        position: 'absolute',
        bottom: '15%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#1f2020',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    flagImageStyle: {
        height: 26,
        width: 26,
        marginHorizontal: 5,
    },
    gsmBoxContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#DCDDDE',
        marginVertical: 5,
    },
    flagContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.21,
    },
});

export default SignUp;
