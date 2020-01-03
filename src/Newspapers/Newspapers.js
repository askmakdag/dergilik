import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MagazinFrameContainer from '../MagazineFrameContainer';
import {add_newspaper} from '../Store/Actions';

class Newspapers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sorted_newspapers: [],
        };
    }

    static navigationOptions = {
        title: 'Gazeteler',
    };

    componentWillMount() {
        this.setState({sorted_newspapers: this.arrangeNewspapers(this.props.newspapers)});
    }

    sortBy = (type) => {
        let json = this.props.newspapers;

        if (type === 'DATE') {
            json.sort(function (a, b) {
                let parts_a = a.year.split('/');
                let parts_b = b.year.split('/');

                const date_a = new Date(parts_a[2], parts_a[1] - 1, parts_a[0]);
                const date_b = new Date(parts_b[2], parts_b[1] - 1, parts_b[0]);

                return date_a - date_b;
            });
            console.log('sorted json by DATE: ', json);
            this.setState({sorted_newspapers: this.arrangeNewspapers(json)});
        }

        if (type === 'NAME') {
            json.sort(function (a, b) {
                return ('' + a.name).localeCompare(b.name);
            });
            console.log('sorted json by NAME: ', json);
            this.setState({sorted_newspapers: this.arrangeNewspapers(json)});
        }
    };

    arrangeNewspapers = (newspapers) => {
        const items = [];
        for (let i = 0; i < newspapers.length; i++) {
            if (i % 2 === 0) {
                if (typeof newspapers[i + 1] !== 'undefined') {
                    items.push([newspapers[i], newspapers[i + 1]]);
                } else {
                    items.push([newspapers[i]]);
                }
            }
        }

        return items;
    };

    filterBy = (value) => {
        let json = this.props.newspapers;
        const result = json.filter(word => word.name.indexOf(value) >= 0);
        if (result.length === 0) {
            /** Aranan bulunamaz ise hepsini listele.*/
        } else {
            /** Aranan bulunur ise arananı listele.*/
            this.setState({sorted_newspapers: this.arrangeNewspapers(result)});
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({sorted_newspapers: this.arrangeNewspapers(nextProps.newspapers)});
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'NEWSPAPER'}
                                       Data={this.state.sorted_newspapers}
                                       filterBy={(value) => this.filterBy(value)}
                                       sortBy={(type) => this.sortBy(type)}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        newspapers: state.magazinesStore.newspapers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_newspaper: (magazine) => dispatch(add_newspaper(magazine)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Newspapers);
