import React, { Component } from 'react';
import { Linking, View, FlatList, Alert } from 'react-native';
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';
import { connect } from 'react-redux';
import data from './data.json';
import { styles } from './style';
import { logout, updateNotifications } from '../../store/actions/';

const url = 'https://portal.ipaysuite.com/password/reset';

class SettingsScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            isChecked: {
                'Email notifications': this.props.notifications.email_notify || 0,
                'SMS notifications': this.props.notifications.sms || 0,
            },
        };
    }


    onPressItem = title => {
        switch (title) {
            case 'Log Out':
                this.onLogout();
                break;
            case 'Change password':
                this.changePassword();
                break;
            default:
                this.onCheck(title);
                break;
        }
    }

    changePassword = () => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.warn("Don't know how to open URI: " + url);
            }
        });
    };


    onCheck = async(title) => {
        const type = title === 'Email notifications' ? 'email_notify' : 'sms';
        await this.setState({ isChecked: {...this.state.isChecked, [title]: this.state.isChecked[title] ? 0 : 1 } });
        await this.props.updateNotifications(this.state.isChecked, this.props.notifications.id);
        await this.setState({ isChecked: {...this.state.isChecked, [title]: this.props.notifications[type] } });
    }

    onLogout = async() => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?', [{
                    text: 'Yes',
                    onPress: async() => {
                        await this.props.onLogOut();
                    },
                },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ], { cancelable: false },
        );
    }

    render() {
        return ( <
            View style = { styles.container } >
            <
            Header title = "Settings" /
            >
            <
            FlatList data = { data }
            keyExtractor = {
                (item, index) => `${index}` }
            extraData = { this.state }
            renderItem = {
                ({ item, index }) => < ItemList
                item = { item }
                onPress = { this.onPressItem }
                isChecked = { this.state.isChecked }
                notifications = { this.props.notifications || {} }
                />} /
                >
                <
                /View>
            );
        }
    }

    const mapStateToProps = (state) => ({
        notifications: state.employees.notifications,
    });

    const mapDispatchToProps = dispatch => ({
        onLogOut: () => dispatch(logout()),
        updateNotifications: (notifications, notificationsId) => dispatch(updateNotifications(notifications, notificationsId)),
    });

    export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);