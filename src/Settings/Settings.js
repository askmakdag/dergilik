import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import generalSettings from '../generalSettings';
import {Auth} from 'aws-amplify';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            switchValue: true,
        };
    };

    static navigationOptions = () => {
        return {
            headerTitle: 'Ayarlar',
        };
    };

    SignOut = async () => {
        await Auth.signOut();
        this.props.navigation.navigate('SignIn');
    };

    render() {
        const iconColor = generalSettings.buttonColor;
        const {switchValue} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>

                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.titleTextStyle}>Hesap Ayarları</Text>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Profil</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Hesap</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.titleTextStyle}>Gizlilik ve Güvenlik</Text>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Hesap Gizliliği</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Parola</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.titleTextStyle}>Dergi</Text>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Kaydettiklerim</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Favorilerim</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Beğendiklerim</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.titleTextStyle}>Gazete</Text>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Kaydettiklerim</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Favorilerim</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Beğendiklerim</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.titleTextStyle}>Bildirim Ayarları</Text>

                    <View style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Tüm Bildirimleri Kapat</Text>
                        <Switch onValueChange={() => this.setState({switchValue: !switchValue})}
                                value={switchValue}/>
                    </View>
                </View>

                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.titleTextStyle}>Destek</Text>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Sorun Bildir</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.titleTextStyle}>Hakkında</Text>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Dergilik Nedir?</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity style={styles.itemContainerStyle}>
                            <Text style={styles.itemText}>Dergilik' in Hikayesi</Text>
                            <View>
                                <Icon name="arrow-right" size={15} color={iconColor}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.itemContainerStyle}>
                        <Text style={styles.itemText}>Gizlilik ilkemiz</Text>
                        <View>
                            <Icon name="arrow-right" size={15} color={iconColor}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.signOutContainerStyle} onPress={() => this.SignOut()}>
                    <Text style={styles.signOutTextStyle}>Hesaptan Çık</Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    signOutContainerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        borderColor: generalSettings.buttonColor,
        backgroundColor: generalSettings.buttonColor,
        marginTop: 15,
        marginBottom: 15,
    },
    signOutTextStyle: {
        color: '#fff',
        fontWeight: '500',
        marginVertical: 7,
    },
    titleTextStyle: {
        color: generalSettings.buttonColor,
        fontWeight: '500',
        fontSize: 15,
        marginTop: 30,
    },
    itemContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemText: {
        color: '#000',
        fontWeight: '400',
        fontSize: 15,
        marginTop: 15,
    },
    sectionContainerStyle: {
        flexDirection: 'column',
    },
    backToMainAccontText: {
        color: '#fff',
        fontWeight: '500',
        marginHorizontal: 5,
        marginVertical: 10,
    },
    backToMainAccontContainer: {
        borderRadius: 2,
        alignItems: 'center',
        backgroundColor: generalSettings.buttonColor,
        marginTop: 20,
    },

});

export default Settings;
