<<<<<<< HEAD
import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { MAIN_COLOR } from '../utility/colors';

export default class Checkbox extends Component {
    render() {
        const { checkSize = 12, checkColor = "#fff", containerStyle = {}, isChecked = false, onPress = () => { } } = this.props
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.container, isChecked && { backgroundColor: MAIN_COLOR, borderWidth: 0 }, containerStyle]}>
                    {isChecked && <Icon name="md-checkmark" color={checkColor} size={checkSize} />}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    }
=======
import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { MAIN_COLOR } from '../utility/colors';

export default class Checkbox extends Component {
    render() {
        const { checkSize = 12, checkColor = "#fff", containerStyle = {}, isChecked = false, onPress = () => { } } = this.props
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.container, containerStyle, isChecked && { backgroundColor: MAIN_COLOR, borderWidth: 0 }, ]}>
                    {isChecked && <Icon name="md-checkmark" color={checkColor} size={checkSize} />}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    }
>>>>>>> bdba1535f17253dd806ddde69f578f46a902e196
})