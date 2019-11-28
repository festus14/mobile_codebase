    import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SCREEN_HEIGHT } from '../utility/constants'
import { GREY } from '../utility/colors'

export default class InputText extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle || {}]}>
                {this.props.icon && <Icon
                    name={this.props.icon}
                    style={[styles.icon, this.props.iconStyle || {}]}
                    size={this.props.iconSize}
                    color={this.props.iconColor}
                />}
                <TextInput
                    style={[styles.input, this.props.inputStyle || {}]}
                    {...this.props}
                    ref={input => { this.props.getRef && this.props.getRef(input) }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: GREY,
        borderBottomWidth: 1,
        marginBottom: SCREEN_HEIGHT * 0.03,
        paddingHorizontal: 2
    },
    icon: {
        width: '12%',
        textAlign: 'center'
    },
    input: {
        paddingVertical: 10,
        paddingRight: 10,
        fontSize: 16,
        flex: 1,
    }
})