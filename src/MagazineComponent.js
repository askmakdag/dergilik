import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Platform, Text} from 'react-native';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Pdf from 'react-native-pdf';
import {withNavigation} from 'react-navigation';
import aws_credentials from '../aws_credentials';
import RNFetchBlob from 'rn-fetch-blob';
import CacheImageComponent from './Components/CacheImageComponent';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';

const s3 = new AWS.S3({
    region: aws_credentials.region,
    credentials: {
        accessKeyId: aws_credentials.accessKeyId,
        secretAccessKey: aws_credentials.secretAccessKey,
    },
});
let Spinner = require('react-native-spinkit');

class MagazineComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            magazine_path: {},
            saved_path: {},
            cover_path: this.getUrl(),
            visible: false,
        };
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: navigation.state.params.name,
        };
    };


    componentWillMount() {
        this.fetchPdf();
        this.setState({saved_path: {uri: Platform.OS === 'android' ? 'file://' + this.props.navigation.state.params.dataUrl : '' + this.props.navigation.state.params.dataUrl}});
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

    loadSpinner = () => {
        const types = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce',
            'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'];

        const num = Math.ceil(Math.random() * 13);

        return <View style={styles.spinnerContainerStyle}>
            <Spinner style={styles.spinnerStyle} isVisible={true} size={100} type={types[num]}
                     color={'#3498DB'}/>
            <Text style={styles.loadingTextStyle}>Yükleniyor</Text>
        </View>;
    };

    getUrl() {
        const params = {
            Bucket: aws_credentials.s3Bucket,
            Key: 'uploads/' + this.props.navigation.state.params.name + ' Cover.png',
        };
        return s3.getSignedUrl('getObject', params);
    }

    render() {
        const {cover_path, visible, saved_path, magazine_path} = this.state;
        const {name, sizeMB, from} = this.props.navigation.state.params;

        return <View style={styles.mainContainer}>
            <View display={visible ? 'none' : 'flex'} style={styles.teaserContainerStyle}>
                <View style={styles.coverImageContainer}>
                    <CacheImageComponent style={styles.coverStyle} uri={cover_path} coverName={name}/>
                    <Text style={styles.sizeTextStyle}>{sizeMB} MB</Text>
                    <Button title={'OKU'} buttonStyle={styles.readButtonStyle}
                            onPress={() => this.setState({visible: true})}/>
                </View>
            </View>

            <View style={styles.pdfContainerStyle} display={visible ? 'flex' : 'none'}>
                <Pdf
                    horizontal={true}
                    enablePaging={true}
                    source={from === 'SAVED' ? saved_path : magazine_path}
                    style={styles.pdfStyle}
                    activityIndicator={this.loadSpinner()}
                />
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        height: Dimensions.get('window').height,
    },
    pdfStyle: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    pdfContainerStyle: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
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
    teaserContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#123456',
    },
    teaserMainContainerStyle: {
        flexDirection: 'column',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#123456',
    },
    coverStyle: {
        height: Dimensions.get('window').width * 0.9,
        width: Dimensions.get('window').width * 0.65,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: Dimensions.get('window').height * 0.1,
    },
    coverImageContainer: {
        height: Dimensions.get('window').height * 0.5,
        width: Dimensions.get('window').width,
        marginVertical: '5%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    readButtonStyle: {
        width: Dimensions.get('window').width * 0.7,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#FF5733',
        marginTop: 40,
    },
    sizeTextStyle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#a8a9aa',
        marginTop: 10,
    },
});

const mapStateToProps = state => {
    return {
        saved: state.magazinesStore.saved,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MagazineComponent));
