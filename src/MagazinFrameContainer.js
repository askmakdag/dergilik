import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput, Dimensions} from 'react-native';
import MagazinFrame from './MagazinFrame';
import axios from 'axios';
import {add_magazin} from './Store/Actions/index';
import {connect} from 'react-redux';

const backgroundColor = '#dcddde';

class MagazinFrameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search_text: '',
            modalVisible: false,
            magazinsX: [],
        };
    }

    async componentWillMount() {
        const magazins = [];
        await axios.get('https://u3d29ombf7.execute-api.us-east-1.amazonaws.com/v1_0_0')
            .then(response => {
                    console.log('Get API Response: ', response);

                    const feed = response.data.Items.filter(item => item.type === 'magazine');

                    for (let i = 0; i < feed.length; i++) {
                        if (i % 2 === 0) {
                            if (typeof feed[i + 1] !== 'undefined') {
                                magazins.push([feed[i], feed[i + 1]]);
                            } else {
                                magazins.push([feed[i]]);
                            }
                        }


                    }
                    console.log('magazins: ', magazins);
                    this.props.add_magazin(magazins);
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

        let json = this.state.magazinsX;
        const result = json.filter(word => word.name.indexOf(value) >= 0);
        if (result.length === 0) {
            /** Aranan bulunamaz ise hepsini listele.*/
            //this.setState({magazins: this.state.magazinsX});
        } else {
            /** Aranan bulunur ise arananı listele.*/
            //this.setState({magazins: result});
        }
    }

    sortBy = (type) => {
        let json = this.state.magazins;
        this.setState({modalVisible: false});

        if (type === 'DATE') {
            json.sort(function (a, b) {
                return a.year - b.year;
            });
            console.log('sorted json by DATE: ', json);
        }

        if (type === 'NAME') {
            json.sort(function (a, b) {
                return ('' + a.name).localeCompare(b.name);
            });
            console.log('sorted json by NAME: ', json);
        }
    };

    handleVisibilityModal = () => {
        this.state.modalVisible ? this.setState({modalVisible: false}) : this.setState({modalVisible: true});
    };

    renderHeader = () => {
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: Dimensions.get('window').width * 0.02}}>
                    <TextInput
                        style={styles.searchBoxStyle}
                        placeholderTextColor={'#8E9494'}
                        placeholder={'Dergi Ara'}
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
        const {magazins} = this.props;

        return (
            <FlatList
                data={magazins}
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
    return {
        magazins: state.magazinsStore.magazins[0],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_magazin: (magazin) => dispatch(add_magazin(magazin)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MagazinFrameContainer);
