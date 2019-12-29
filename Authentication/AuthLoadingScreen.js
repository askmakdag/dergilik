import React from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import {Auth} from 'aws-amplify';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase({name: 'dataA1.db', location: 'default'});

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

        /** SQLite database initialization */
        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS table_magazins', []);
            tx.executeSql('CREATE TABLE IF NOT EXISTS table_magazins(magazinId INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), year INT(10), magazin_base64 CLOB)', []);
        });

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
