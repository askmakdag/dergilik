import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MagazinFrameContainer from '../MagazineFrameContainer';

class Newspapers extends Component {

    static navigationOptions = {
        title: 'Gazeteler',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'NEWSPAPER'} Data={this.props.newspapers}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        newspapers: state.magazinesStore.newspapers[0],
    };
};

export default connect(mapStateToProps, null)(Newspapers);
