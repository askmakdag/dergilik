import React, {Component} from 'react';
import {Dimensions, Image, Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import aws_credentials from '../aws_credentials';

const s3 = new AWS.S3({
    region: aws_credentials.region,
    credentials: {
        accessKeyId: aws_credentials.accessKeyId,
        secretAccessKey: aws_credentials.secretAccessKey,
    },
});

class MagazinFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
        };
    };

    static navigationOptions = {
        title: 'Dergiler',
    };

    getUrl() {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.magazinName + ' Cover.png',
            Expires: 60,
        };
        const url = s3.getSignedUrl('getObject', params);
        console.log('generated url: ', url);
        return url;
    }

    navigateToMagazin = () => {
        this.props.navigation.navigate('MagazinComponent', {name: this.props.magazinName});
    };

    componentWillMount = async () => {
        const path = this.getUrl();
        await this.setState({path: path});
    };

    saveMagazin = () => {
        Alert.alert('Emin misin?');
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
                    <Text style={styles.magazinInfoTextStyle}> {this.props.year} </Text>

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

export default withNavigation(MagazinFrame);
