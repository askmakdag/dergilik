import {Text, Button, View} from 'react-native';
import React from 'react';
import SignIn from './Authentication/SignIn';
import {Auth} from 'aws-amplify';

export default class DetailsScreen extends React.Component {


    SignOut = async () => {
        await Auth.signOut();
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>


                <Button title={'Çıkış Yap'} onPress={() => this.SignOut()}/>
            </View>
        );
    }
}
