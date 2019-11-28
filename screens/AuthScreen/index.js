import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { connect } from 'react-redux';
import { logIn, authError } from '../../store/actions';
import { GREY } from '../../utility/colors';
import validate from '../../utility/validation';
import { styles } from './style';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import DismissKeyboard from '../../components/DismissKeyboard';
import logo from '../../assets/images/logo.jpg';
import { SCREEN_HEIGHT } from '../../utility/constants';

const url = 'https://portal.ipaysuite.com/password/reset';

class AuthScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: {
                field: 'Password',
                value: '',
                error: undefined,
                validationRules: {
                    minLength: 4,
                },
            },
            email: {
                field: 'Email',
                value: '',
                error: undefined,
                validationRules: {
                    isEmail: true,
                    minLength: 5,
                },
            },
            error: '',
        };
    }

    validateUser = () => {
        const { email, password } = this.state;
        let error = '';
        error = validate(email.value, email.validationRules, email.field);
        if (error) { return error; }
        error = validate(password.value, password.validationRules, password.field);
        if (error) { return error; }
        return '';
    }

    loginHandler = async() => {
        if (this.state.email.value !== '' && this.state.password.value !== '') {
            try {
                await this.setState(prevState => ({
                    ...prevState,
                    email: {
                        ...prevState.email,
                        error: validate(prevState.email.value, prevState.email.validationRules, prevState.email.field),
                    },
                    password: {
                        ...prevState.password,
                        error: validate(prevState.password.value, prevState.password.validationRules, prevState.password.field),
                    },
                }));

                let error = this.validateUser();

                if (error) { this.showError(error); } else {
                    const authData = {
                        email: this.state.email.value.toLowerCase(),
                        password: this.state.password.value,
                    };

                    error = await this.props.onLogIn(authData);
                    if (error) { this.showError(error); }
                }
            } catch (error) {
                console.warn(error);
            }
        }
    }

    showError = (error) => {
        this.setState({ error });
    }

    onChangeText = (input, type) => {
        this.setState({
            [type]: {
                ...this.state[type],
                value: input,
            },
        });
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

    render() {
        return ( <
            DismissKeyboard >
            <
            KeyboardAvoidingView behavior = { Platform.OS === 'ios' ? 'padding' : null }
            style = {
                { flex: 1 } } >
            <
            View style = { styles.container }
            showsVerticalScrollIndicator = { false }
            contentContainerStyle = {
                { height: SCREEN_HEIGHT } } >
            <
            View style = { styles.image } >
            <
            Image style = {
                { width: '60%', height: '60%' } }
            resizeMode = "contain"
            source = { logo }
            /> <
            Text style = { styles.headText } > Sign in to account < /Text> <
            /View> <
            View style = { styles.form } >
            <
            Text style = { styles.error } > { this.state.error } < /Text> <
            InputText icon = "envelope"
            placeholder = "Email"
            autoCorrect = { false }
            iconSize = { 16 }
            iconColor = { GREY }
            value = { this.state.email.value }
            onSubmitEditing = {
                () => { this.password.focus(); } }
            onChangeText = { input => this.onChangeText(input, 'email') }
            autoCapitalize = "none"
            returnKeyType = "next"
            keyboardType = "email-address" /
            >
            <
            InputText icon = "lock"
            placeholder = "Password"
            secureTextEntry iconSize = { 16 }
            iconColor = { GREY }
            value = { this.state.password.value }
            getRef = { input => { this.password = input; } }
            onChangeText = { input => this.onChangeText(input, 'password') }
            autoCapitalize = "none"
            returnKeyTpe = "go"
            onSubmitEditing = { this.loginHandler }
            /> <
            Button text = "Sign In"
            style = { styles.btn }
            textStyle = { styles.btnText }
            isLoading = { this.props.isLoading }
            onPress = { this.loginHandler }
            /> <
            TouchableOpacity onPress = { this.changePassword }
            style = { styles.forgot } > < Text style = { styles.forgotText } > Forgot Password ? < /Text></TouchableOpacity >
            <
            /View> <
            View style = {
                { justifyContent: 'flex-end', alignItems: 'center', padding: 30 } } > < Text style = { styles.vText } > v1 .0 < /Text></View >
            <
            /View> <
            /KeyboardAvoidingView> <
            /DismissKeyboard>
        );
    }
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.ui.isLoading,
    isDoneLoading: state.ui.isDoneLoading,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    onLogIn: (authData) => dispatch(logIn(authData)),
    authError: (error) => dispatch(authError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);