import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MagazinFrameContainer from '../MagazineFrameContainer';
import {Icon} from 'react-native-elements';

class Saved extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sorted_saved: [],
            displayMode: 'GALERI_MODE',
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Kaydettiklerim',
            headerRight: (
                <Icon
                    name='settings'
                    onPress={() => navigation.navigate('Settings')}
                    containerStyle={{marginHorizontal: 10}}
                    color={'#fff'}
                />
            ),
        };
    };

    componentWillMount() {
        this.setState({sorted_saved: this.arrangeSavedItems(this.props.saved)});
    }

    sortBy = (type) => {
        let json = this.props.saved;

        if (type === 'DATE') {
            json.sort(function (a, b) {
                let parts_a = a.year.split('/');
                let parts_b = b.year.split('/');

                const date_a = new Date(parts_a[2], parts_a[1] - 1, parts_a[0]);
                const date_b = new Date(parts_b[2], parts_b[1] - 1, parts_b[0]);

                return date_a - date_b;
            });
            console.log('sorted json by DATE: ', json);
            this.setState({sorted_saved: this.arrangeSavedItems(json)});
        }

        if (type === 'NAME') {
            json.sort(function (a, b) {
                return ('' + a.name).localeCompare(b.name);
            });
            console.log('sorted json by NAME: ', json);
            this.setState({sorted_saved: this.arrangeSavedItems(json)});
        }
    };

    arrangeSavedItems = (saved_items) => {
        const items = [];
        for (let i = 0; i < saved_items.length; i++) {
            if (i % 2 === 0) {
                if (typeof saved_items[i + 1] !== 'undefined') {
                    items.push([saved_items[i], saved_items[i + 1]]);
                } else {
                    items.push([saved_items[i]]);
                }
            }
        }

        return items;
    };

    filterBy = (value) => {
        let json = this.props.saved;
        const result = json.filter(word => word.name.indexOf(value) >= 0);
        if (result.length === 0) {
            /** Aranan bulunamaz ise hepsini listele.*/
        } else {
            /** Aranan bulunur ise arananı listele.*/
            this.setState({sorted_saved: this.arrangeSavedItems(result)});
        }
    };

    changeDisplayMode = (mode) => {
        console.log('mode changed to: ', mode);
        this.setState({displayMode: mode});
    };

    componentWillReceiveProps(nextProps) {
        this.setState({sorted_saved: this.arrangeSavedItems(nextProps.saved)});
    }

    render() {
        const {displayMode} = this.state;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'SAVED'}
                                       Data={displayMode === 'LIST_MODE' ? this.props.saved : this.state.sorted_saved}
                                       DisplayMode={displayMode}
                                       changeMode={(mode) => this.changeDisplayMode(mode)}
                                       filterBy={(value) => this.filterBy(value)}
                                       From={"SAVED"}
                                       sortBy={(type) => this.sortBy(type)}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        saved: state.magazinesStore.saved,
    };
};


const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
