import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import MagazinFrame from './MagazinFrame';
import {withNavigation} from 'react-navigation';
import axios from 'axios';

class MagazinFrameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search_text: '',
            magazins: [
                {magazinId: 4, year: 2017, name: 'NME Camila Cebello'},
                {magazinId: 2, year: 2018, name: 'Enterpreneur USA 2018'},
                {magazinId: 1, year: 2019, name: 'The Economist USA 2019'},
                {magazinId: 3, year: 2020, name: 'iPad & iPhone'},
            ],
        };
    }

    componentDidMount() {
        axios.get('https://rjhp9hv0ql.execute-api.us-east-1.amazonaws.com/dev/magazin/', {
            params: {
                magazinId: '123',
            },
        })
            .then(response => {
                    console.log('Get API Response: ', response);

                },
            )
            .catch(function (error) {
                console.log('Get API Hatası: ', error);
            });
    }

    onChangeText(key, value) {
        this.setState({
            key: value,
        });
    }

    renderHeader = () => {
        return (
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.searchBoxStyle}
                    placeholderTextColor={'#8E9494'}
                    placeholder={'Dergi Ara'}
                    onChangeText={value => this.onChangeText('search_text', value)}
                    multiline={false}
                    autoFocus={false}
                />
            </View>
        );
    };

    render() {
        const {magazins} = this.state;

        return (
            <FlatList
                data={magazins}
                renderItem={({item}) => (
                    <MagazinFrame magazinId={item.magazinId} magazinName={item.name} year={item.year}/>
                )}
                keyExtractor={item => item.magazinId}
                refreshing={this.state.refreshing}
                ListHeaderComponent={this.renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                style={{flex: 1}}
            />
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        width: '100%',
        marginLeft: '2.5%',
        marginVertical: 5,
    },
    searchBoxStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: '95%',
        height: 35,
        textAlign: 'left',
        paddingHorizontal: 20,
        backgroundColor: '#DFECEB',
        fontWeight: '500',
    },
    placeHolderStyle: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 35,
        textAlign: 'left',
        paddingHorizontal: 20,
        backgroundColor: '#DFECEB',
        fontWeight: '500',
    },
});

export default withNavigation(MagazinFrameContainer);
