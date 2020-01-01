import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MagazinFrameContainer from '../MagazineFrameContainer';
import {add_magazine} from '../Store/Actions';

class Magazines extends Component {

    static navigationOptions = {
        title: 'Dergiler',
    };

    sortBy = (type) => {
        let json = this.props.magazines;

        if (type === 'DATE') {
            json.sort(function (a, b) {
                let parts_a = a.year.split('/');
                let parts_b = b.year.split('/');

                const date_a = new Date(parts_a[2], parts_a[1] - 1, parts_a[0]);
                const date_b = new Date(parts_b[2], parts_b[1] - 1, parts_b[0]);

                return date_a - date_b;
            });
            console.log('sorted json by DATE: ', json);
            this.props.add_magazine(json);
        }

        if (type === 'NAME') {
            json.sort(function (a, b) {
                return ('' + a.name).localeCompare(b.name);
            });
            console.log('sorted json by NAME: ', json);
            this.props.add_magazine(json);
        }
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'MAGAZINE'}
                                       Data={this.props.sorted_magazines}
                                       sortBy={(type) => this.sortBy(type)}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        magazines: state.magazinesStore.magazines,
        sorted_magazines: state.magazinesStore.sorted_magazines,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        add_magazine: (magazine) => dispatch(add_magazine(magazine)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Magazines);
