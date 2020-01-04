import React, {Component} from 'react';
import {View} from 'react-native';
import MagazinFrameContainer from '../MagazineFrameContainer';
import {connect} from 'react-redux';
import axios from 'axios';
import {add_feed, add_magazine, add_newspaper} from '../Store/Actions/index';


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sorted_feed: [],
        };
    }

    static navigationOptions = {
        title: 'Ana Sayfa',
    };

    sortBy = (type) => {
        let json = this.props.feed;

        if (type === 'DATE') {
            json.sort(function (a, b) {
                let parts_a = a.year.split('/');
                let parts_b = b.year.split('/');

                const date_a = new Date(parts_a[2], parts_a[1] - 1, parts_a[0]);
                const date_b = new Date(parts_b[2], parts_b[1] - 1, parts_b[0]);

                return date_a - date_b;
            });
            console.log('sorted json by DATE: ', json);
            this.setState({sorted_feed: this.arrangeFeed(json)});
        }

        if (type === 'NAME') {
            json.sort(function (a, b) {
                return ('' + a.name).localeCompare(b.name);
            });
            console.log('sorted json by NAME: ', json);
            this.setState({sorted_feed: this.arrangeFeed(json)});
        }
    };

    filterBy = (value) => {
        let json = this.props.feed;
        const result = json.filter(word => word.name.indexOf(value) >= 0);
        if (result.length === 0) {
            /** Aranan bulunamaz ise hepsini listele.*/
        } else {
            /** Aranan bulunur ise arananı listele.*/
            this.setState({sorted_feed: this.arrangeFeed(result)});
        }
    };

    async componentWillMount() {
        await axios.get('https://u3d29ombf7.execute-api.us-east-1.amazonaws.com/v1_0_0')
            .then(response => {
                    console.log('Get API Response: ', response);

                    let feed_magazine = response.data.Items.filter(item => item.type === 'magazine');
                    let feed_newspaper = response.data.Items.filter(item => item.type === 'newspaper');
                    let feed_article = response.data.Items.filter(item => item.type === 'article');

                    this.props.add_feed(feed_article);
                    this.props.add_magazine(feed_magazine);
                    this.props.add_newspaper(feed_newspaper);
                },
            )
            .catch(function (error) {
                console.log('Get API Hatası: ', error);
            });
        this.setState({sorted_feed: this.arrangeFeed(this.props.feed)});
    }

    arrangeFeed = (feed) => {
        const items = [];
        for (let i = 0; i < feed.length; i++) {
            if (i % 2 === 0) {
                if (typeof feed[i + 1] !== 'undefined') {
                    items.push([feed[i], feed[i + 1]]);
                } else {
                    items.push([feed[i]]);
                }
            }
        }

        return items;
    };

    componentWillReceiveProps(nextProps) {
        this.setState({sorted_feed: this.arrangeFeed(nextProps.feed)});
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'MIX'}
                                       Data={this.state.sorted_feed}
                                       filterBy={(value) => this.filterBy(value)}
                                       sortBy={(type) => this.sortBy(type)}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        feed: state.magazinesStore.feed,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_feed: (feed) => dispatch(add_feed(feed)),
        add_magazine: (magazine) => dispatch(add_magazine(magazine)),
        add_newspaper: (newspaper) => dispatch(add_newspaper(newspaper)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
