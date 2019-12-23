import React, {Component} from 'react';
import {View, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, Dimensions} from 'react-native';
import MagazinFrame from './MagazinFrame';
import {withNavigation} from 'react-navigation';
import axios from 'axios';

class MagazinFrameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            magazins: [
                {magazinId: 4, name: 'Camila Cebello'},
                {magazinId: 2, name: 'Enterpreneur USA 2018'},
                {magazinId: 1, name: 'The Economist USA 2019'},
                {magazinId: 3, name: 'iPad & iPhone'},
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

    handleRefresh = () => {
        this.setState({
            refreshing: false,
        });
    };

    renderFooter = () => {
        if (!this.state.loading) {
            return null;
        }

        return (
            <View style={{paddingVertical: 40}}>
                <ActivityIndicator/>
            </View>
        );
    };

    renderHeader = () => {
        return <View style={{paddingVertical: 40}}> </View>;
    };

    render() {
        const {magazins} = this.state;

        return (
            <FlatList
                data={magazins}
                renderItem={({item}) => (
                    <MagazinFrame magazinId={item.magazinId} magazinName={item.name}/>
                )}
                keyExtractor={item => item.magazinId}
                refreshing={this.state.refreshing}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                style={{flex: 1}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default withNavigation(MagazinFrameContainer);
