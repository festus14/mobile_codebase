import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DARK_GREEN, LIGHTER_GREY, ALMOST_BLACK, GREY, SECONDARY_COLOR, MAIN_COLOR } from '../utility/colors';
import { getMonth } from '../utility/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';


export default class ReportsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDownloadingPDF: false,
            isDownloadingExcel: false,
        };
    }

    downloadReports = async (type = 'PDF') => {
        if (type === 'PDF') {
            try {
                const { item, downloadReports, token } = this.props;
                this.setState({
                    isDownloadingPDF: true,
                });

                let resJson = await downloadReports(item.month, item.year, item.group_id, item.company_id);

                if (!resJson) { throw new Error(); }

                let dirs = RNFetchBlob.fs.dirs;

                console.warn(dirs);

                let filename = `report-${item.group_id}.zip`;

                let file = await RNFetchBlob.config({
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: false,
                        description: 'Zip file of Payslips',
                        mime: 'application/octet-stream',
                        title: filename,
                        path: dirs.DCIMDir + `/${filename}`,
                    },
                    path: dirs.DocumentDir + `/${filename}`,

                })
                    .fetch('GET', resJson.url, {
                        'Authorization': 'Bearer ' + token,
                    });

                console.warn(file);

                alert('The file was saved to ' + file.path());

                this.setState({
                    isDownloadingPDF: false,
                });
            } catch (e) {
                this.setState({ isDownloadingPDF: false });
            }
        } else {

        }
    }

    render() {
        const { item, navigation, payroll } = this.props;

        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{getMonth(payroll.month)} {payroll.year}</Text>
                <Text style={[styles.sectionTitle, { fontSize: 17, fontWeight: 'bold' }]}>{item} Report</Text>
                <View style={styles.view}>
                    {this.state.isDownloadingExcel ?
                        <ActivityIndicator style={{ marginRight: 25 }} color={MAIN_COLOR} size={25} /> : <TouchableOpacity style={{ marginRight: 25 }} disabled={this.state.isDownloadingExcel} onPress={() => this.downloadPayrolls('excel')}>
                            <Icon name="file-excel-o" size={25} color={MAIN_COLOR} />
                        </TouchableOpacity>}
                    {this.state.isDownloadingPDF ?
                        <ActivityIndicator color={SECONDARY_COLOR} size={25} /> : <TouchableOpacity disabled={this.state.isDownloadingPDF} onPress={this.downloadPayrolls}>
                            <Icon name="file-pdf-o" size={25} color={SECONDARY_COLOR} />
                        </TouchableOpacity>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    section: {
        margin: 10,
        backgroundColor: '#fff',
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
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 15,
        color: ALMOST_BLACK,
        padding: 15,
    },
    white: {
        color: LIGHTER_GREY,
    },
    footer: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 15,
        textAlign: 'center',
        flexGrow: 1,
    },
    view: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
