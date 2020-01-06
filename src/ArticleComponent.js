import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, ScrollView, Text} from 'react-native';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import {withNavigation} from 'react-navigation';
import aws_credentials from '../aws_credentials';

const s3 = new AWS.S3({
    region: aws_credentials.region,
    credentials: {
        accessKeyId: aws_credentials.accessKeyId,
        secretAccessKey: aws_credentials.secretAccessKey,
    },
});

import CacheImageComponent from './Components/CacheImageComponent';

class ArticleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            magazine_path: {},
            header_pic_path: this.getUrl('_header_pic.png'),
            main_pic_path: this.getUrl('_main_pic.png'),
            visible: false,
            articleParts: [],
        };
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: navigation.state.params.name,
        };
    };

    getUrl(ext) {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.navigation.state.params.name + ext,
        };
        return s3.getSignedUrl('getObject', params);
    }

    renderContext = () => {
        const {article, name} = this.props.navigation.state.params;
        const {main_pic_path} = this.state;

        const articleParts = [];

        for (let i = 0; i < article.length; i++) {
            if (i % 2 === 0) {
                if (i === 2) {
                    articleParts.push(<Text style={styles.contextTextStyle}>{article[i]}</Text>);
                    articleParts.push(<View style={styles.mainPicContainerStyle}>
                        <CacheImageComponent style={styles.mainPicStyle} uri={main_pic_path}
                                             coverName={name + '_main_pic.png'}/>
                    </View>);
                } else {
                    articleParts.push(<Text style={styles.headerTextStyle}>{article[i]}</Text>);
                }

            } else {
                articleParts.push(<Text style={styles.contextTextStyle}>{article[i]}</Text>);
            }
        }
        this.setState({articleParts: articleParts});
    };

    componentWillMount() {
        this.renderContext();
    }

    render() {
        const {header_pic_path, articleParts} = this.state;
        const {teaserInfo, name, year} = this.props.navigation.state.params;

        return <ScrollView>
            <View style={styles.mainContainer}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <CacheImageComponent style={styles.headerPicStyle} uri={header_pic_path}
                                         coverName={name + '_header_pic.png'}/>

                    <Text style={styles.articleNameTextStyle}>{name}</Text>
                    <Text style={styles.teaserTextInfo}>{teaserInfo}</Text>

                    <View style={styles.articleContainerStyle}>
                        <Text style={styles.articleYearTextStyle}>{year}</Text>
                        <Text style={styles.articleYearTextStyle}>
                            {this.props.navigation.state.params.viewCount} kez okundu</Text>
                    </View>

                    {articleParts}

                </View>

            </View>
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
    },
    headerPicStyle: {
        height: Dimensions.get('window').height * 0.25,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
    },
    mainPicStyle: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width * 0.8,
        resizeMode: 'cover',
    },
    teaserTextInfo: {
        fontSize: 16,
        marginHorizontal: 14,
        fontWeight: '500',
        color: '#292929',
    },
    articleNameTextStyle: {
        margin: 15,
        fontSize: 16,
        fontWeight: '400',
        color: '#525252',
    },
    articleContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 5,
        height: 35,
    },
    articleYearTextStyle: {
        fontSize: 11,
        fontWeight: '400',
        color: '#909192',
    },
    headerTextStyle: {
        fontSize: 15,
        fontWeight: '600',
        margin: 15,
        lineHeight: 25,
    },
    contextTextStyle: {
        fontSize: 15,
        fontWeight: '400',
        marginVertical: 10,
        marginHorizontal: 15,
        lineHeight: 25,
    },
    mainPicContainerStyle: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        marginHorizontal: Dimensions.get('window').width * 0.1,
    },
});

export default withNavigation(ArticleComponent);
