import React from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import {Auth} from 'aws-amplify';

export default class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
    }

    componentWillMount = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            if (user) {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
        } catch (err) {
            console.log('error occured with Initializing ...', err);
            this.props.navigation.navigate('Auth');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
