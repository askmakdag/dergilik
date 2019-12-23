import React, {Component} from 'react';
import {View, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, Dimensions} from 'react-native';
import MagazinFrame from './MagazinFrame';
import {withNavigation} from 'react-navigation';

class MagazinFrameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            magazins: [{magazinId: 1}, {magazinId: 2}, {magazinId: 3}, {magazinId: 4}],
        };
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
        console.log('magazins: ', magazins);

        return (
            <FlatList
                data={magazins}
                renderItem={(item) => (
                    <MagazinFrame magazinId={item.magazinId}/>
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
