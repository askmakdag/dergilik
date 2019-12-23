import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Pdf from 'react-native-pdf';
import {withNavigation} from 'react-navigation';

const s3 = new AWS.S3({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAT3ESAL4HE4VSOEOY',
        secretAccessKey: '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',
    },
});

class MagazinComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    getUrl() {
        const params = {
            Bucket: 'dergilikotp-userfiles-mobilehub-717446809',
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
