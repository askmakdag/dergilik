import React, {Component} from 'react';
import {Dimensions, Image, Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import aws_credentials from '../aws_credentials';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';

const s3 = new AWS.S3({
    region: aws_credentials.region,
    credentials: {
        accessKeyId: aws_credentials.accessKeyId,
        secretAccessKey: aws_credentials.secretAccessKey,
    },
});

import SQLite from 'react-native-sqlite-2';
import CacheImageComponent from './Components/CacheImageComponent';

const db = SQLite.openDatabase({name: 'dataA1.db', location: 'default'});
const DEVICE_WIDTH = Dimensions.get('window').width;

class MagazineFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
        };
    };

    getUrl() {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.Name + ' Cover.png',
        };
        return s3.getSignedUrl('getObject', params);
    }

    navigateToMagazine = () => {
        const {navigation, From, Name, Type, sizeMB, ViewedCount, Year, TeaserInfo, Article} = this.props;

        console.log('Name:Name: ', Name);

        if (Type === 'article') {
            navigation.navigate('ArticleComponent', {
                name: Name,
                from: From,
                year: Year,
                viewCount: ViewedCount,
                teaserInfo: TeaserInfo,
                article: Article,
            });
        } else {
            navigation.navigate('MagazineComponent', {name: Name, from: From, sizeMB: sizeMB});
        }
    };

    componentWillMount = async () => {
        const path = this.getUrl();
        await this.setState({path: path});
    };

    saveMagazine = () => {
        Alert.alert(
            this.props.Name,
            'Dergiyi kaydetmek istediğinize emin misiniz?',
            [
                {text: 'İptal', style: 'cancel'},
                {text: 'Kaydet', onPress: () => this.saveToDatabase()},
            ],
            {cancelable: false},
        );
    };

    saveToDatabase = () => {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.Name + '.pdf',
        };
        const url = s3.getSignedUrl('getObject', params);

        RNFetchBlob.fetch('GET', url)
            .then((res) => {
                console.log('res: ', res);

                let status = res.info().status;

                if (status === 200) {
                    // the conversion is done in native code
                    let magazine_base64 = res.base64();

                    const Name = this.props.Name;
                    const Year = this.props.Year;

                    db.transaction((tx) => {
                        //tx.executeSql('DROP TABLE IF EXISTS table_magazines', []);
                        tx.executeSql('CREATE TABLE IF NOT EXISTS table_magazines(magazineId INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), year INT(10), magazin_base64 CLOB)', []);
                        tx.executeSql('INSERT INTO table_magazines (name, year, magazine_base64) VALUES (?,?,?)', [Name, Year, magazine_base64]);
                        tx.executeSql('SELECT * FROM table_magazines', [], (tx, results) => {
                            for (let i = 0; i < results.rows.length; i++) {
                                console.log('item:', results.rows.item(i));
                            }
                        });
                    });

                } else {
                    // handle other status codes
                    console.log('hata!');
                }
            })
            .catch((errorMessage, statusCode) => {
            });
    };

    render() {
        const {path} = this.state;
        const {Name, TeaserInfo, ViewedCount, Year, Type, DisplayMode} = this.props;

        const containerWidth = DisplayMode === 'LIST_MODE' ? DEVICE_WIDTH * 0.88 : DEVICE_WIDTH * 0.47;
        const containerHeight = DisplayMode === 'LIST_MODE' ? DEVICE_WIDTH * 1.5 : DEVICE_WIDTH * 0.88;
        const containerArticleHeight = DisplayMode === 'LIST_MODE' ? (Type === 'article' ? DEVICE_WIDTH * 1.8 : DEVICE_WIDTH * 1.5) : DEVICE_WIDTH * 1.2;

        return (
            <TouchableOpacity
                style={Type === 'article' ? [styles.containerArticle, {
                    width: containerWidth,
                    height: containerArticleHeight,
                }] : [styles.container, {
                    width: containerWidth,
                    height: containerHeight,
                }]}
                onPress={() => this.navigateToMagazine()}
                onLongPress={() => this.saveMagazine()}>
                <CacheImageComponent style={styles.coverStyle} uri={path} coverName={Name}/>
                <View style={styles.magazineInfoContainerStyle}>
                    <Text style={styles.magazineNameTextStyle}>{Name}</Text>
                    <Text style={styles.magazineInfoTextStyle} multiline={true}>{TeaserInfo}</Text>

                    <View style={styles.bottomInfoContainerStyle}>
                        <Text style={styles.bottomInfoTextStyle}>{Year}</Text>
                        <Text style={styles.bottomInfoTextStyle}>{ViewedCount} kez okundu</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        //height: Dimensions.get('window').width * 0.88,
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    containerArticle: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    coverStyle: {
        flex: 1,
        resizeMode: 'cover',
    },
    magazineInfoContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 3,
        width: Dimensions.get('window').width * 0.42,
        marginHorizontal: 10,
    },
    magazineInfoTextStyle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#202323',
        marginVertical: 10,
    },
    magazineNameTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#2f2f2f',
        marginVertical: 10,
    },
    bottomInfoContainerStyle: {
        width: Dimensions.get('window').width * 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    bottomInfoTextStyle: {
        fontSize: 8,
        fontWeight: '300',
        color: '#757677',
    },
});

const mapStateToProps = state => {
    return {
        magazines: state.magazinesStore.magazines,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MagazineFrame));
