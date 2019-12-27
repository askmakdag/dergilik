import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
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

        return s3.getSignedUrl('getObject', params);
    }

    render() {
        /** ios tarafında çalışıyor ancak android ile çalışmadı.*/
        const source = {
            uri: this.getUrl(),
            cache: true,
        };
        const from = this.props.navigation.state.params.from;
        const src = {uri: 'data:application/pdf;base64,' + this.state.magazin_base64};

        return <Pdf
            source={from === 'HOME_PAGE' ? source : src}
            style={styles.pdf}
        />;
    }
}

const styles = StyleSheet.create({
    pdf: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default withNavigation(MagazinComponent);
