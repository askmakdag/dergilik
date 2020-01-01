import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MagazinFrameContainer from '../MagazineFrameContainer';

class Magazines extends Component {

    static navigationOptions = {
        title: 'Dergiler',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'MAGAZINE'} Data={this.props.magazines}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        magazines: state.magazinesStore.magazines[0],
    };
};

export default connect(mapStateToProps, null)(Magazines);
