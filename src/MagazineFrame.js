import React, {Component} from 'react';
import {Dimensions, Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import aws_credentials from '../aws_credentials';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';
import SQLite from 'react-native-sqlite-2';
import CacheImageComponent from './Components/CacheImageComponent';
import {get_all_saved, save_item} from './Store/Actions';
import {Auth} from 'aws-amplify';

const s3 = new AWS.S3({
    region: aws_credentials.region,
    credentials: {
        accessKeyId: aws_credentials.accessKeyId,
        secretAccessKey: aws_credentials.secretAccessKey,
    },
});
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
        const {navigation, From, Name, Type, sizeMB, ViewedCount, Year, TeaserInfo, Article, DataURL} = this.props;

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
            navigation.navigate('MagazineComponent', {name: Name, from: From, sizeMB: sizeMB, dataUrl: DataURL});
        }
    };

    componentWillMount = async () => {
        const path = this.getUrl();
        await this.setState({path: path});
    };

    removeFromDatabase = async (name) => {
        const items = this.props.saved.filter((item) => item.name !== name);
        await this.props.get_all_saved(items);
        await db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS table_magazines', []);
            tx.executeSql('CREATE TABLE IF NOT EXISTS table_magazines(magazineId INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20),user_phone VARCHAR(15),type VARCHAR(20),teaser_info VARCHAR(50),viewed_count INT(10),year INT(10),size_mb INT(10),data_url VARCHAR(150))', []);
            for (let i = 0; i < items.length; i++) {
                tx.executeSql('INSERT INTO table_magazines (name, user_phone, type, teaser_info, viewed_count, year, size_mb, data_url) VALUES (?,?,?,?,?,?,?,?)', [items[i].name, items[i].user_phone, items[i].type, items[i].teaser_info, items[i].viewed_count, items[i].year, items[i].size_mb, items[i].data_url]);
            }
        });

    };

    saveMagazine = () => {
        if (this.props.From === 'SAVED') {
            Alert.alert(
                this.props.Name,
                'İndirilenlerden kaldırmak istediğinize emin misiniz?',
                [
                    {text: 'İptal', style: 'cancel'},
                    {text: 'Kaldır', onPress: () => this.removeFromDatabase(this.props.Name)},
                ],
                {cancelable: false},
            );
        } else {
            Alert.alert(
                this.props.Name,
                'Dergiyi kaydetmek istediğinize emin misiniz?',
                [
                    {text: 'İptal', style: 'cancel'},
                    {text: 'Kaydet', onPress: () => this.saveToDatabase()},
                ],
                {cancelable: false},
            );
        }
    };

    saveToDatabase = async () => {
        const {Name, TeaserInfo, ViewedCount, Year, Type, sizeMB, saved} = this.props;

        for (let i = 0; i < saved.length; i++) {
            if (saved[i].name === Name) {
                Alert.alert(this.props.Name + ' zaten kayıltı.');
                return null;
            }
        }

        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.Name + '.pdf',
        };
        const url = s3.getSignedUrl('getObject', params);

        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true,
            appendExt: 'pdf',
            mediaScannable: false,
        })
            .fetch('GET', url)
            .then(async (res) => {
                // console.log('res: ', res.path());
                let status = res.info().status;
                if (status === 200) {
                    // the conversion is done in native code
                    const user = await Auth.currentAuthenticatedUser();
                    const userPhone = user.attributes.phone_number.toString();

                    await db.transaction((tx) => {
                        //tx.executeSql('DROP TABLE IF EXISTS table_magazines', []);
                        tx.executeSql('CREATE TABLE IF NOT EXISTS table_magazines(magazineId INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20),user_phone VARCHAR(15),type VARCHAR(20),teaser_info VARCHAR(50),viewed_count INT(10),year INT(10),size_mb INT(10),data_url VARCHAR(150))', []);
                        tx.executeSql('INSERT INTO table_magazines (name, user_phone, type, teaser_info, viewed_count, year, size_mb, data_url) VALUES (?,?,?,?,?,?,?,?)', [Name, userPhone, Type, TeaserInfo, ViewedCount, Year, sizeMB, res.path()]);
                        tx.executeSql('SELECT * FROM table_magazines', [], (tx, results) => {
                            for (let i = 0; i < results.rows.length; i++) {
                                console.log('item:', results.rows.item(i));
                            }
                            this.props.save_item(results.rows.item(results.rows.length - 1));
                        });
                    });
                } else {
                    // handle other status codes
                    console.log('hata!');
                }
            })
            .catch((errorMessage, statusCode) => {
                console.log('errrorMessage: ', errorMessage);
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
                    width: containerWidth, height: containerArticleHeight,
                }] : [styles.container, {
                    width: containerWidth, height: containerHeight,
                }]}
                onPress={() => this.navigateToMagazine()}
                onLongPress={() => Type === 'article' ? null : this.saveMagazine()}>
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
        saved: state.magazinesStore.saved,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        save_item: (item) => dispatch(save_item(item)),
        get_all_saved: (saved_items) => dispatch(get_all_saved(saved_items)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MagazineFrame));
