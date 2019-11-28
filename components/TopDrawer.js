import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { PHOTO_URL, SCREEN_HEIGHT } from '../utility/constants';
import defaultImage from '../assets/images/myAvatar.png'
import MyImage from './MyImage';
import { SECONDARY_COLOR, LIGHTER_GREY } from '../utility/colors';
import { DrawerItems } from 'react-navigation';

class TopDrawer extends Component {
    render() {
        let { navigation } = this.props;
        const employee = navigation.getParam('employee', {});
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.personal}>
                    <MyImage resizeMode="contain" style={styles.image} source={employee.users ? [{ uri: PHOTO_URL + employee.users.picture }, defaultImage] : [defaultImage]} />
                    <View>
                        <Text style={styles.name}>{`${employee.firstname} ${employee.middlename || ''} ${employee.lastname}` || 'Unknown Unknown'}</Text>
                        <Text style={styles.email}>{employee.email || 'mail@domain.com'}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <DrawerItems {...this.props} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
})

const styles = StyleSheet.create({
    personal: {
        minHeight: SCREEN_HEIGHT * 0.2,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
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
                elevation: 10,
            },
        }),
        marginBottom: 10
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 1000,
    },
    name: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    email: {
        color: LIGHTER_GREY,
        fontSize: 11,
        textAlign: 'center',
    },
})


export default connect(mapStateToProps, null)(TopDrawer);
