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

const db = SQLite.openDatabase({name: 'dataA1.db', location: 'default'});

class MagazinFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
        };
    };

    getUrl() {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.magazinName + ' Cover.png',
        };
        const url = s3.getSignedUrl('getObject', params);
        console.log('generated url: ', url);
        return url;
    }

    navigateToMagazin = () => {
        this.props.navigation.navigate('MagazinComponent', {name: this.props.magazinName, from: this.props.from});
    };

    componentWillMount = async () => {
        const path = this.getUrl();
        await this.setState({path: path});
    };

    saveMagazin = () => {
        Alert.alert(
            this.props.magazinName,
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
            Key: 'uploads/' + this.props.magazinName + '.pdf',
        };
        const url = s3.getSignedUrl('getObject', params);

        RNFetchBlob.fetch('GET', url)
            .then((res) => {
                console.log('res: ', res);

                let status = res.info().status;

                if (status === 200) {
                    // the conversion is done in native code
                    let magazin_base64 = res.base64();

                    const magazinName = this.props.magazinName;
                    const magazinYear = this.props.magazinYear;

                    db.transaction((tx) => {
                        //tx.executeSql('DROP TABLE IF EXISTS table_magazins', []);
                        tx.executeSql('CREATE TABLE IF NOT EXISTS table_magazins(magazinId INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), year INT(10), magazin_base64 CLOB)', []);
                        tx.executeSql('INSERT INTO table_magazins (name, year, magazin_base64) VALUES (?,?,?)', [magazinName, magazinYear, magazin_base64]);
                        tx.executeSql('SELECT * FROM table_magazins', [], (tx, results) => {
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

    fetchPdf = () => {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.magazinName + '.pdf',
        };
        const url = s3.getSignedUrl('getObject', params);

        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache: true,
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.log('The file saved to ', res.path());
                this.setState({magazin_path: res.path()});
            });
    };


    render() {
        const {path} = this.state;

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.navigateToMagazin()}
                              onLongPress={() => this.saveMagazin()}>
                <Image
                    style={styles.coverStyle}
                    source={{uri: path}}
                />
                <View style={styles.magazinInfoContainerStyle}>
                    <Text style={styles.magazinInfoTextStyle}> {this.props.magazinName} </Text>
                    <Text style={styles.magazinInfoTextStyle}> {this.props.magazinYear} </Text>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFECEB',
        height: Dimensions.get('window').width * 1.33,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
    },
    coverStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        padding: 5,
    },
    magazinInfoContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 3,
        width: Dimensions.get('window').width * 0.9,
    },
    magazinInfoTextStyle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#202323',
    },
});


const mapStateToProps = state => {
    return {
        magazins: state.magazinsStore.magazins,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MagazinFrame));
