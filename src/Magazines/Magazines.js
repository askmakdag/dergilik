import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MagazinFrameContainer from '../MagazineFrameContainer';
import {add_magazine} from '../Store/Actions';

class Magazines extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sorted_magazines: [],
        };
    }

    static navigationOptions = {
        title: 'Dergiler',
    };

    componentWillMount() {
        this.setState({sorted_magazines: this.arrangeMagazines(this.props.magazines)});
    }

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
            this.setState({sorted_magazines: this.arrangeMagazines(json)});
        }

        if (type === 'NAME') {
            json.sort(function (a, b) {
                return ('' + a.name).localeCompare(b.name);
            });
            console.log('sorted json by NAME: ', json);
            this.setState({sorted_magazines: this.arrangeMagazines(json)});
        }
    };

    arrangeMagazines = (magazines) => {
        const items = [];
        for (let i = 0; i < magazines.length; i++) {
            if (i % 2 === 0) {
                if (typeof magazines[i + 1] !== 'undefined') {
                    items.push([magazines[i], magazines[i + 1]]);
                } else {
                    items.push([magazines[i]]);
                }
            }
        }

        return items;
    };

    filterBy = (value) => {
        let json = this.props.magazines;
        const result = json.filter(word => word.name.indexOf(value) >= 0);
        if (result.length === 0) {
            /** Aranan bulunamaz ise hepsini listele.*/
        } else {
            /** Aranan bulunur ise arananı listele.*/
            this.setState({sorted_magazines: this.arrangeMagazines(result)});
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({sorted_magazines: this.arrangeMagazines(nextProps.magazines)});
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'MAGAZINE'}
                                       Data={this.state.sorted_magazines}
                                       filterBy={(value) => this.filterBy(value)}
                                       sortBy={(type) => this.sortBy(type)}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        magazines: state.magazinesStore.magazines,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        add_magazine: (magazine) => dispatch(add_magazine(magazine)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Magazines);
