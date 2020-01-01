import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput, Dimensions} from 'react-native';
import MagazinFrame from './MagazineFrame';
import {add_feed, add_magazine, add_newspaper} from './Store/Actions/index';
import {connect} from 'react-redux';

const backgroundColor = '#dcddde';

class MagazineFrameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search_text: '',
            modalVisible: false,
            magazinesX: [],
        };
    }

    onChangeText(key, value) {
        this.setState({
            key: value,
        });

        let json = this.state.magazinesX;
        const result = json.filter(word => word.name.indexOf(value) >= 0);
        if (result.length === 0) {
            /** Aranan bulunamaz ise hepsini listele.*/
            //this.setState({magazines: this.state.magazinesX});
        } else {
            /** Aranan bulunur ise arananı listele.*/
            //this.setState({magazines: result});
        }
    }

    sortBy = (type) => {
        this.props.sortBy(type);
        this.handleVisibilityModal();
    };

    handleVisibilityModal = () => {
        this.state.modalVisible ? this.setState({modalVisible: false}) : this.setState({modalVisible: true});
    };

    renderHeader = () => {
        const {Type} = this.props;

        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: Dimensions.get('window').width * 0.02}}>
                    <TextInput
                        style={styles.searchBoxStyle}
                        placeholderTextColor={'#8E9494'}
                        placeholder={Type === 'MIX' ? 'Yayın Ara' : Type === 'MAGAZINE' ? 'Dergi Ara' : 'Gazete Ara'}
                        onChangeText={value => this.onChangeText('search_text', value)}
                        multiline={false}
                        autoFocus={false}
                    />

                    <TouchableOpacity onPress={() => this.handleVisibilityModal()}>
                        <Image
                            source={require('../assets/sort.png')}
                            style={{
                                width: Dimensions.get('window').width * 0.06,
                                height: Dimensions.get('window').width * 0.06,
                                marginHorizontal: 5, marginVertical: 5,
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <Modal animationType="slide"
                       transparent={true}
                       visible={this.state.modalVisible}
                >
                    <View style={styles.modalView}>

                        <TouchableOpacity style={styles.unfollowContainerStyle}
                                          onPress={() => this.sortBy('DATE')}>
                            <Text style={styles.unfollowTextStyle}>Yayınlanma tarihine göre sırala</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.unfollowContainerStyle}
                                          onPress={() => this.sortBy('NAME')}>
                            <Text style={styles.unfollowTextStyle}>İsme göre sırala</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleVisibilityModal()}
                                          style={styles.cancelContainerStyle}>
                            <Text style={styles.cancelTextStyle}>Vazgeç</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    };

    renderItem = (item) => {
        if (item.length === 2) {
            return <View style={styles.renderItemContainerStyle}>
                <MagazinFrame Name={item[0].name}
                              Year={item[0].year}
                              TeaserInfo={item[0].teaser_info}
                              ViewedCount={item[0].viewed_count}
                              From={'HOME_PAGE'}/>
                <MagazinFrame Name={item[1].name}
                              Year={item[1].year}
                              TeaserInfo={item[1].teaser_info}
                              ViewedCount={item[1].viewed_count}
                              From={'HOME_PAGE'}/>
            </View>;
        } else {
            return <View style={{marginHorizontal: Dimensions.get('window').width * 0.02}}>
                <MagazinFrame Name={item[0].name}
                              Year={item[0].year}
                              TeaserInfo={item[0].teaser_info}
                              ViewedCount={item[0].viewed_count}
                              From={'HOME_PAGE'}/>
            </View>;
        }
    };

    render() {
        const {Data} = this.props;

        return (
            <FlatList
                data={Data}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={item => item[0].magazinId}
                refreshing={this.state.refreshing}
                ListHeaderComponent={this.renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                style={{flex: 1, backgroundColor: backgroundColor}}
            />
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        marginTop: 8,
    },
    searchBoxStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.88,
        height: 35,
        textAlign: 'left',
        paddingHorizontal: 20,
        backgroundColor: '#fafafa',
        fontWeight: '500',
        color: '#000',
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
    modalView: {
        backgroundColor: '#999E9E',
        width: Dimensions.get('window').width * 0.96,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 15,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cancelTextStyle: {
        color: '#F71A1A',
        fontWeight: '600',
        fontSize: 18,
        height: 40,
        marginTop: 15,
        alignSelf: 'center',
    },
    cancelContainerStyle: {
        backgroundColor: '#fff',
        width: '97%',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    unfollowTextStyle: {
        color: '#149CFB',
        fontWeight: '400',
        fontSize: 18,
        height: 40,
        marginTop: 15,
        alignSelf: 'center',
    },
    unfollowContainerStyle: {
        borderTopWidth: 0.5,
        alignItems: 'center',
        borderColor: '#A7A9AD',
        backgroundColor: '#fff',
        width: '97%',
        borderRadius: 15,
        marginTop: 10,
    },
    renderItemContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        marginHorizontal: Dimensions.get('window').width * 0.02,
    },
});

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        add_feed: (feed) => dispatch(add_feed(feed)),
        add_magazine: (magazine) => dispatch(add_magazine(magazine)),
        add_newspaper: (magazine) => dispatch(add_newspaper(magazine)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MagazineFrameContainer);
