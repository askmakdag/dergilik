import React, {Component} from 'react';
import {
    StyleSheet, TextInput, View,
    Text, Alert, Dimensions,
    ScrollView, TouchableWithoutFeedback,
    Image, TouchableOpacity,
} from 'react-native';
import {Button, CheckBox, Icon} from 'react-native-elements';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports.js';
import Modal from 'react-native-modal';
import {countries} from '../assets/countries';
import CountryLabelComponent from '../src/Components/CountryLabelComponent';
import SQLite from 'react-native-sqlite-2';

Amplify.configure(aws_exports);
const db2 = SQLite.openDatabase({name: 'dataA2.db', location: 'default'});

const backgroundColor = '#FBFCFC';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cell_phone: '',
            confirmation_code: '',
            checked: false,
            modalVisible: false,
            country: countries[15],
            countriesList: [],
        };
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    SignIn = async () => {
        try {
            const {cell_phone, country, checked} = this.state;
            const username = country.code + cell_phone;
            const success = await Auth.signIn({username: username});
            console.log('user successfully signed in!: ', success);
            this.props.navigation.navigate('ConfirmSignIn', {AuthUser: success});

            if (checked) {
                console.log('checked');
                db2.transaction((tx) => {
                    tx.executeSql('DROP TABLE IF EXISTS user', []);
                    tx.executeSql('CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY NOT NULL, number VARCHAR(30))', []);
                    tx.executeSql('INSERT INTO user (number) VALUES (:number)', [cell_phone]);
                });
            } else {
                console.log('unchecked');
                db2.transaction((tx) => {
                    tx.executeSql('DROP TABLE IF EXISTS user', []);
                });
            }

        } catch (err) {
            console.log('error signing up: ', err);
            Alert.alert('Kullanıcı bulunamadı!');
        }
    };

    handleVisibilityModal = (element) => {
        console.log('element: ', element);

        this.state.modalVisible ? this.setState({modalVisible: false, country: element}) :
            this.setState({modalVisible: true, country: element});
    };

    componentWillMount() {
        const {countriesList} = this.state;

        countries.forEach((element) => {
            countriesList.push(
                <CountryLabelComponent country={element}
                                       handleAction={() => this.handleVisibilityModal(element)}/>);
        });

        console.log('before select...');
        /** Kullanıcının numarası kayıtlı ise hatırla.*/
        db2.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY NOT NULL, number VARCHAR(30))', []);
            tx.executeSql('SELECT * FROM user', [], (tx, results) => {
                console.log('select...');
                console.log('item:', results.rows.item(0));
                if (results.rows.item(0)) {
                    this.setState({cell_phone: results.rows.item(0).number});
                }
            });
        });
    }


    render() {
        const {country, modalVisible} = this.state;

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
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }} onPress={() => this.setState({modalVisible: !modalVisible})}>
                            <Image source={country.flag} style={{
                                height: 26,
                                width: 26,
                                marginHorizontal: 5,
                            }}/>
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
                            style={styles.input}
                            placeholder="Gsm numaranızı giriniz"
                            placeholderTextColor={'#434241'}
                            keyboardType={'numeric'}
                            defaultValue={this.state.cell_phone}
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
});

export default SignIn;
