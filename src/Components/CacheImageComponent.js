import React from 'react' ;
import {View, Image} from 'react-native';

let RNFS = require('react-native-fs');
import shorthash from 'shorthash';

class CacheImageComponent extends React.Component {
    state = {
        source: null,
    };

    loadFile = (path) => {
        console.log(' bulundu loadFile');

        this.setState({source: {uri: path}});
    };

    downloadFile = (uri, path) => {
        console.log('bulunamadı downloadFile');
        RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
            .then(res => this.loadFile(path));
    };

    componentDidMount() {
        const {uri, coverName} = this.props;

        /** Yayın ismine göre path oluşturuyoruz. */
        const cName = shorthash.unique(coverName);
        const cExtension = (Platform.OS === 'android') ? 'file://' : '';
        const cPath = `${cExtension}${RNFS.CachesDirectoryPath}/${cName}.png`;

        RNFS.exists(cPath).then(exists => {
            if (exists) {
                this.loadFile(cPath);
            } else {
                this.downloadFile(uri, cPath);
            }
        });
    }

    /** Updadte edilmesi gereken fotoğraflar burada tespid edilir.
     * Tespit edilen componentler istenilen şekilde 'düzgün veriler ile' tekrar render edilir.*/
    componentWillReceiveProps(nextProps) {
        //console.log('nextProps.coverName: ', nextProps.coverName);
        //console.log('thisProps.coverName: ', this.props.coverName + '\n');

        /** Yayın ismine göre path oluşturuyoruz. */
        const cName = shorthash.unique(nextProps.coverName);
        const cExtension = (Platform.OS === 'android') ? 'file://' : '';
        const cPath = `${cExtension}${RNFS.CachesDirectoryPath}/${cName}.png`;

        RNFS.exists(cPath).then(exists => {
            if (exists) {
                this.loadFile(cPath);
            } else {
                this.downloadFile(nextProps.uri, cPath);
            }
        });
    }

    render() {
        const {style} = this.props;
        const {source} = this.state;

        return (
            <Image style={style} source={source}/>
        );
    }
}

export default CacheImageComponent;
