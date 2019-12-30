import React, {Component} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Pdf from 'react-native-pdf';
import {withNavigation} from 'react-navigation';
import aws_credentials from '../aws_credentials';

const s3 = new AWS.S3({
    region: aws_credentials.region,
    credentials: {
        accessKeyId: aws_credentials.accessKeyId,
        secretAccessKey: aws_credentials.secretAccessKey,
    },
});

import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase({name: 'dataA1.db', location: 'default'});

class MagazinComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            magazin_base64: '',
        };
    };

    componentWillMount() {
        const {from, name} = this.props.navigation.state.params;
        let magazin_base64 = '';

        if (from === 'SAVED_PAGE') {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM table_magazins', [], (tx, results) => {
                        for (let i = 0; i < results.rows.length; i++) {
                            if (results.rows.item(i).name === name) {
                                magazin_base64 = results.rows.item(i).magazin_base64;
                            }
                        }
                        //console.log('magazin_base64: ', magazin_base64);
                        this.setState({magazin_base64: magazin_base64});
                    },
                );
            });
        }
    }

    getUrl() {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.navigation.state.params.name + '.pdf',
        };

        return {
            uri: s3.getSignedUrl('getObject', params),
            cache: true,
        };
    }

    render() {
        const from = this.props.navigation.state.params.from;
        const source = from === 'HOME_PAGE' ? this.getUrl() : {uri: 'data:application/pdf;base64,' + this.state.magazin_base64};

        return <View style={styles.pdfContainerStyle}>
            <Pdf
                horizontal={true}
                fitWidth={true}
                enablePaging={true}
                source={source}
                style={styles.pdfStyle}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    pdfStyle: {
        flex:1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdfContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
});

export default withNavigation(MagazinComponent);
