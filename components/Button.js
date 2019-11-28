import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { MAIN_COLOR } from '../utility/colors'

export default class Button extends Component {
    render() {
        const { icon, style = {}, iconSize, iconColor, isLoading, text, loading = { size: 16, color: "#fff" }, textStyle = {} } = this.props
        return (
            <TouchableOpacity disabled={isLoading} {...this.props} style={[styles.container, style]}>
                {icon &&
                    <Icon
                        name={icon}
                        size={iconSize}
                        color={iconColor}
                    />}
                {text && (isLoading ? <ActivityIndicator style={{ height: loading.size, width: loading.size }} color={loading.color} /> : <Text style={[styles.text, textStyle || {}]}>{text}</Text>)}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: MAIN_COLOR,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(77, 84, 124)',
                shadowOpacity: 0.09,
                shadowOffset: {
                    width: 0,
                    height: 1
                },
            },
            android: {
                elevation: 3
            }
        }),
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    }
});