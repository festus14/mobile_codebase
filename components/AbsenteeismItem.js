import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ALMOST_BLACK, GREY } from '../utility/colors';
import { getMonth, reformatDate } from '../utility/helpers';

export default class AbsenteeismItem extends Component {
    render() {
        const { item } = this.props;
        const date = reformatDate(item.date);

        return (
            <View style={styles.item}>
                <View style={styles.top}>
                    <Text style={styles.date}>{`${getMonth(date.getMonth() + 1)} ${date.getFullYear()}`}</Text>
                    <Text style={styles.days}>{item.days} day(s)</Text>
                </View>
                <Text style={styles.description}>{item.description || `Employee was absent for ${item.days} day(s) in ${getMonth(date.getMonth() + 1)} ${date.getFullYear()}`}</Text>
            </View>
        );
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
        minHeight: 50,
        backgroundColor: '#f9f9f9',
        borderRadius: 3
    },
    top: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    date: {
        fontWeight: 'bold',
        color: ALMOST_BLACK,
        fontSize: 15,
    },
    days: {
        color: GREY,
        fontSize: 14,
    },
    description: {
        margin: 10,
        marginTop: 0,
        color: ALMOST_BLACK,
        fontSize: 13,
    }
});
