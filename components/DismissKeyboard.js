    
import React, { Component } from 'react'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'

export default class DismissKeyboard extends Component {
  render() {
      const {children} = this.props;
    return (
    <TouchableWithoutFeedback style={this.props.style} onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
    );
  }
}