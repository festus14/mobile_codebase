import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Modal, Alert, PermissionsAndroid } from 'react-native';
import { ALMOST_BLACK, DARK_GREEN, LIGHT_GREY } from '../utility/colors';
import { getPercentage } from '../utility/helpers';
import WebView from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/Ionicons';
import { bottomRight, bottomLeft, topRight, topLeft } from './html';

export default class PayslipItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isPermitted: false,
        };
    }

    closeModal = () => {
        if (this.state.isModalOpen) {
            this.toggleModal();
            return true;
        }
        return false;
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    createPdf = async () => {
        await this.requestExternalWritePermission();
        if (this.state.isPermitted) {
            let options = {
                html: this.html(),
                fileName: `payslip-${this.props.item.info.employee.staff_no}(${this.props.item.date})`,
                directory: 'Documents',
            };

            let file = await RNHTMLtoPDF.convert(options);
            alert('Saved at: ' + file.filePath);
        }
    }

    onClickCreate = () => {
        Alert.alert(
            'Download Payslip',
            'Are you sure you want to download payslip?',
            [
                {
                    text: 'Yes', onPress: this.createPdf,
                },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    async requestExternalWritePermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'iPaySuite External Storage Write Permission',
                    message:
                        'iPaySuite needs access to Storage data in your SD Card ',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //If WRITE_EXTERNAL_STORAGE Permission is granted
                //changing the state to show Create PDF option
                this.setState({ isPermitted: true });
            } else {
                alert('WRITE_EXTERNAL_STORAGE permission denied');
            }
        } catch (err) {
            alert('Write permission err', err);
            console.warn(err);
        }
    }

    render() {
        const { item } = this.props;
        return (
            <View style={styles.item}>
                <Modal
                    visible={this.state.isModalOpen}
                    onRequestClose={() => { }}
                    animationType="fade"
                    transparent
                >
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={this.toggleModal}><Text style={styles.city}>Close</Text></TouchableOpacity>
                        <WebView
                            originWhitelist={['*']}
                            style={{ flex: 1 }}
                            source={{
                                html: this.html(),
                            }}
                        />
                    </View>
                </Modal>
                <View style={styles.top}>
                    {item.info && <Text style={[styles.topText, { color: DARK_GREEN }]}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.info.employee.lastname.toUpperCase()}</Text>, {item.info.employee.firstname}</Text>}
                    <Text style={styles.topText}>{item.date}</Text>
                </View>
                {item.info && <View style={styles.middle}>
                <Text style={styles.city}>{item.info.location}</Text>
                    <Text style={styles.dept}>{item.info.department}</Text>
                </View>}
                {item.pcm && <View style={styles.net}>
                    <Text style={styles.netText}>{getPercentage(item.pcm.net_pay, 100) || 0.00}</Text>

                </View>}
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.btn} onPress={this.toggleModal}><Icon name="ios-eye" color={'#FFF'} size={24} /></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { alignItems: 'flex-end' }]} onPress={this.onClickCreate}><Icon name="ios-download" color={'#FFF'} size={24} /></TouchableOpacity>
                </View>
            </View>
        );
    }

    html = () => {
        const { item } = this.props;
        const pos = item.company.logo_position;
        if (pos === 'bottom_left') {
            return bottomLeft(item);
        } if (pos === 'bottom_right') {
            return bottomRight(item);
        } if (pos === 'top_left') {
            return topLeft(item);
        } if (pos === 'top_right') {
            return topRight(item);
        }
    }
}

const styles = StyleSheet.create({
    item: {
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(77, 84, 124)',
                shadowOpacity: 0.09,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            },
            android: {
                elevation: 4,
            },
        }),
        margin: 10,
        justifyContent: 'space-between',
        height: 170,
        backgroundColor: '#f9f9f9',
        borderRadius: 3,
    },
    top: {
        margin: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    topText: {
        color: ALMOST_BLACK,
        fontSize: 13,
    },
    middle: {
        marginHorizontal: 10,
    },
    city: {
        color: ALMOST_BLACK,
        fontSize: 17,
    },
    dept: {
        color: LIGHT_GREY,
        fontWeight: 'bold',
        fontSize: 12,
    },
    net: {
        marginHorizontal: 10,
    },
    netText: {
        fontSize: 20,
        color: DARK_GREEN,
    },
    bottom: {
        backgroundColor: DARK_GREEN,
        width: '100%',
        flexDirection: 'row',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        justifyContent: 'space-between',
        height: '25%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});
