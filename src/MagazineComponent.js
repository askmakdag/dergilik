import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Platform, Text} from 'react-native';
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

class MagazineComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            magazine_path: {},
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
                this.setState({magazine_path: {uri: Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path()}});
            });
    };

    asd = () => {
        const types = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce',
            'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'];

        const num = Math.ceil(Math.random() * 13);

        return <View style={styles.spinnerContainerStyle}>
            <Spinner style={styles.spinnerStyle} isVisible={true} size={100} type={types[num]}
                     color={'#3498DB'}/>
            <Text style={styles.loadingTextStyle}>Yükleniyor</Text>
        </View>;
    };

    render() {
        console.log('path:: ', this.state.magazine_path);
        return <View style={styles.pdfContainerStyle}>
            <Pdf
                horizontal={true}
                fitPolicy={2}
                enablePaging={true}
                source={this.state.magazine_path}
                style={styles.pdfStyle}
                activityIndicator={this.asd()}
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
    spinnerStyle: {
        marginVertical: 25,
    },
    spinnerContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#fff',
    },
    loadingTextStyle: {
        fontSize: 24,
        fontWeight: '500',
        marginVertical: 40,
        color: '#AEB6BF',
        fontFamily: 'HelveticaNeue-MediumItalic',
    },
});

export default withNavigation(MagazineComponent);