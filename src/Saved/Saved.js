import React, {Component} from 'react';
import {View, Button, StyleSheet, FlatList, Dimensions} from 'react-native';
import MagazinFrame from '../MagazinFrame';
import {withNavigation} from 'react-navigation';
import SignIn from '../../Authentication/SignIn';
import {Auth} from 'aws-amplify';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase({name: 'dataA1.db', location: 'default'});

class Saved extends Component {

    constructor(props) {
        super(props);
        this.state = {
            magazins: [],
        };
    }

    static navigationOptions = {
        title: 'SAVED',
    };

    SignOut = async () => {
        await Auth.signOut();
        this.props.navigation.navigate('SignIn');
    };

    async componentWillMount() {
        let magazinsArr = [];
        await db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_magazins', [], (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        magazinsArr.push({name: results.rows.item(i).name, year: results.rows.item(i).year});
                    }
                    console.log('magazinsArr: ', magazinsArr);
                    this.setState({magazins: magazinsArr});
                },
            );
        });
    }

    renderFooter = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 15}}>
                <Button title={'Çıkış Yap'} onPress={() => this.SignOut()}/>
            </View>
        );
    };

    render() {
        const {magazins} = this.state;

        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={magazins}
                    renderItem={({item}) => (
                        <MagazinFrame magazinName={item.name} magazinYear={item.year} from={'SAVED_PAGE'}/>
                    )}
                    keyExtractor={item => item.magazinId}
                    refreshing={this.state.refreshing}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this.renderFooter}
                    contentContainerStyle={{flexGrow: 1}}
                    style={{flex: 1}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        //marginLeft: '2.5%',
        marginTop: 8,
    },
});

export default withNavigation(Saved);