import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput, Dimensions} from 'react-native';
import MagazinFrame from './MagazinFrame';
import {withNavigation} from 'react-navigation';
import axios from 'axios';

class MagazinFrameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search_text: '',
            modalVisible: false,
            magazins: [
                {magazinId: 4, year: 2017, name: 'NME Camila Cebello'},
                {magazinId: 3, year: 2020, name: 'iPad & iPhone'},
                {magazinId: 1, year: 2019, name: 'The Economist USA 2019'},
                {magazinId: 2, year: 2018, name: 'Enterpreneur USA 2018'},
            ],
            magazinsX: [
                {magazinId: 4, year: 2017, name: 'NME Camila Cebello'},
                {magazinId: 3, year: 2020, name: 'iPad & iPhone'},
                {magazinId: 1, year: 2019, name: 'The Economist USA 2019'},
                {magazinId: 2, year: 2018, name: 'Enterpreneur USA 2018'},
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

        let json = this.state.magazinsX;
        const result = json.filter(word => word.name.indexOf(value) >= 0);
        if (result.length === 0) {
            /** Aranan bulunamaz ise hepsini listele.*/
            this.setState({magazins: this.state.magazinsX});
        } else {
            /** Aranan bulunur ise arananı listele.*/
            this.setState({magazins: result});
        }
        //console.log('result: ', result);
    }

    sortBy = (type) => {
        let json = this.state.magazins;

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
                <View style={{flex: 1, flexDirection: 'row'}}>
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
                            style={{width: 23, height: 23, marginHorizontal: 5, marginVertical: 5}}
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
        width: Dimensions.get('window').width * 0.8,
        marginLeft: '2.5%',
        marginTop: 8,
    },
    searchBoxStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.8,
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
});

export default withNavigation(MagazinFrameContainer);
