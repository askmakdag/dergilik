import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Platform, ActivityIndicator} from 'react-native';
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
import RNFetchBlob from 'rn-fetch-blob';

const db = SQLite.openDatabase({name: 'dataA1.db', location: 'default'});
let Spinner = require('react-native-spinkit');

class MagazinComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            magazin_path: {},
        };
    };

    componentWillMount() {
        this.fetchPdf();
    }

    fetchPdf = () => {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.navigation.state.params.name + '.pdf',
        };
        const url = s3.getSignedUrl('getObject', params);

        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache: true,
                appendExt: 'pdf',
                mediaScannable: false,
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.log('The file saved to ', res.path());
                this.setState({magazin_path: {uri: Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path()}});
            });
    };

    asd = () => {
        return <Spinner/>;
    };

    render() {
        console.log('path:: ', this.state.magazin_path);
        return <View style={styles.pdfContainerStyle}>
            <Pdf
                horizontal={true}
                fitPolicy={2}
                enablePaging={true}
                source={this.state.magazin_path}
                style={styles.pdfStyle}
                activityIndicator={this.asd()}
                activityIndicatorProps={{color: '#734456', progressTintColor: '#567567'}}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    pdfStyle: {
        flex: 1,
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
    lottie: {
        width: 100,
        height: 100,
    },
});

export default withNavigation(MagazinComponent);
