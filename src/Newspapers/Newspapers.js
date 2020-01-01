import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MagazinFrameContainer from '../MagazineFrameContainer';
import { add_newspaper} from '../Store/Actions';

class Newspapers extends Component {

    static navigationOptions = {
        title: 'Gazeteler',
    };

    sortBy = (type) => {
        let json = this.props.newspapers;

        if (type === 'DATE') {
            json.sort(function (a, b) {
                return a.year - b.year;
            });
            console.log('sorted json by DATE: ', json);
            this.props.add_feed(json);
        }

        if (type === 'NAME') {
            json.sort(function (a, b) {
                return ('' + a.name).localeCompare(b.name);
            });
            console.log('sorted json by NAME: ', json);
            this.props.add_newspaper(json);
        }
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'NEWSPAPER'}
                                       Data={this.props.sorted_newspapers}
                                       sortBy={(type) => this.sortBy(type)}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        newspapers: state.magazinesStore.newspapers,
        sorted_newspapers: state.magazinesStore.sorted_newspapers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_newspaper: (magazine) => dispatch(add_newspaper(magazine)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Newspapers);
