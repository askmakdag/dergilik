import React, {Component} from 'react';
import {View} from 'react-native';
import MagazinFrameContainer from '../MagazineFrameContainer';
import {connect} from 'react-redux';
import axios from 'axios';
import {add_feed, add_magazine, add_newspaper} from '../Store/Actions/index';

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Ana Sayfa',
    };

    async componentWillMount() {
        const magazines = [], newspapers = [], feed = [];
        await axios.get('https://u3d29ombf7.execute-api.us-east-1.amazonaws.com/v1_0_0')
            .then(response => {
                    console.log('Get API Response: ', response);

                    let feed_magazine = response.data.Items.filter(item => item.type === 'magazine');
                    let feed_newspaper = response.data.Items.filter(item => item.type === 'newspaper');

                    for (let i = 0; i < feed_magazine.length; i++) {
                        if (i % 2 === 0) {
                            if (typeof feed_magazine[i + 1] !== 'undefined') {
                                magazines.push([feed_magazine[i], feed_magazine[i + 1]]);
                            } else {
                                magazines.push([feed_magazine[i]]);
                            }
                        }
                    }

                    for (let i = 0; i < feed_newspaper.length; i++) {
                        if (i % 2 === 0) {
                            if (typeof feed_newspaper[i + 1] !== 'undefined') {
                                newspapers.push([feed_newspaper[i], feed_newspaper[i + 1]]);
                            } else {
                                newspapers.push([feed_newspaper[i]]);
                            }
                        }
                    }

                    for (let i = 0; i < response.data.Items.length; i++) {
                        if (i % 2 === 0) {
                            if (typeof response.data.Items[i + 1] !== 'undefined') {
                                feed.push([response.data.Items[i], response.data.Items[i + 1]]);
                            } else {
                                feed.push([response.data.Items[i]]);
                            }
                        }
                    }

                    this.props.add_feed(feed);
                    this.props.add_magazine(magazines);
                    this.props.add_newspaper(newspapers);

                },
            )
            .catch(function (error) {
                console.log('Get API Hatası: ', error);
            });
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MagazinFrameContainer Type={'MIX'} Data={this.props.feed}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        feed: state.magazinesStore.feed[0],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_feed: (feed) => dispatch(add_feed(feed)),
        add_magazine: (magazine) => dispatch(add_magazine(magazine)),
        add_newspaper: (magazine) => dispatch(add_newspaper(magazine)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
