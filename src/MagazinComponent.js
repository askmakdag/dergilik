import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Pdf from 'react-native-pdf';
import {withNavigation} from 'react-navigation';
import aws_credentials from '../assets/aws_credentials';

const s3 = new AWS.S3({
    region: aws_credentials.region,
    credentials: {
        accessKeyId: aws_credentials.accessKeyId,
        secretAccessKey: aws_credentials.secretAccessKey,
    },
});

class MagazinComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    getUrl() {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.navigation.state.params.name + '.pdf',
            Expires: 60,
        };
        const url = s3.getSignedUrl('getObject', params);
        console.log('generated url: ', url);
        return url;
    }

    render() {
        /** ios tarafında çalışıyor ancak android ile çalışmadı.*/
        const source = {
            uri: this.getUrl(),
            cache: true,
        };

        return <Pdf
            source={source}
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
