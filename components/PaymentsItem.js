import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ALMOST_BLACK } from '../utility/colors';
import { getPercentage, reformatDate, getMonth } from '../utility/helpers';
import EmployeeItem from './EmployeeItem';

export default class PayslipItem extends Component {
    render() {
        const { item = {} } = this.props;
        const date = reformatDate(item.date);

        return (
            <View style={styles.section}>
                <View style={styles.sectionDetails}>
                    <Text style={styles.sectionTitle}>{item.type ? item.type.name : item.recurrent_deduction_type ? item.recurrent_deduction_type.name : null}</Text>
                    <EmployeeItem title="Amount" value={getPercentage(parseFloat(item.amount), 100)} />
                    <EmployeeItem title="Frequency" value={item.frequency} />
                    <EmployeeItem title="Date" value={`${getMonth(date.getMonth() + 1)} ${date.getFullYear()}`} />
                    <EmployeeItem title="Pensionable" value={item.pensionable} />
                    <EmployeeItem title="Taxable" value={item.taxable} />
                    <EmployeeItem title="Position" value={item.position} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    section: {
        width: '100%',
        padding: 10,
        marginVertical: 5
    },
    sectionTitle: {
        fontSize: 17,
        color: ALMOST_BLACK,
        fontWeight: 'bold',
        marginBottom: 10
    },
    sectionDetails: {
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
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        borderRadius: 5
    },
});
