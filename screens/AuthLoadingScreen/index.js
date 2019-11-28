import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import { authAutoSignIn } from '../../store/actions';

class AuthLoadingScreen extends Component {
    componentDidMount = async () => {
        try {
            const token = await this.props.onAutoSignIn()
            if (token) {
                this.props.navigation.navigate('ExploreScreen')
            } else {
                this.props.navigation.navigate('AuthScreen')
            }
        } catch (error) {
            this.props.navigation.navigate('AuthScreen')
        }
    }

    render() {
        return (
            <View>
                
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onAutoSignIn: () => dispatch(authAutoSignIn())
})

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)