import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { GREY, ALMOST_BLACK } from '../utility/colors';

export default class EmployeeItem extends Component {
    render() {
        if (this.props.value) {
            return (
                <View style={styles.container}>
                    <Text style={[styles.title, this.props.labelStyle || {}]}>{this.props.title}</Text>
                    <Text style={[styles.value, this.props.valueStyle || {}]}>{this.props.value}</Text>
                </View>
            )
        }
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 12,
        color: GREY
    },
    value: {
        fontSize: 14,
        color: ALMOST_BLACK
    }
})
