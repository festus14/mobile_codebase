import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getPayrolls, sendPayrolls } from '../../store/actions';
import PayrollsItem from '../../components/PayrollsItem';
import Header from '../../components/Header';
import { styles } from './style.js';
import { SECONDARY_COLOR } from '../../utility/colors';

class PayrollScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        this.props.getPayrolls();
    }

    render() {
            const { isLoading, payrolls, navigation, token } = this.props;
            return ( <
                View style = { styles.container } >
                <
                Header title = "Payrolls" /
                >
                <
                View style = { styles.container } > {
                    payrolls.length > 0 && !isLoading ? ( < FlatList removeClippedSubviews data = { payrolls }
                        keyExtractor = {
                            (item, index) => `${index}` }
                        renderItem = {
                            ({ item, index }) => ( <
                                PayrollsItem token = { token }
                                downloadPayrolls = { this.props.downloadPayrolls }
                                sendPayrolls = { this.props.sendPayrolls }
                                navigation = { navigation }
                                item = { item }
                                />
                            )
                        }
                        refreshControl = { <
                            RefreshControl
                            refreshing = { isLoading }
                            onRefresh = { this.props.getPayrolls }
                            />
                        }
                        />) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} / >:
                        <
                        View style = { styles.error } >
                        <
                        Text style = { styles.errorText } > No payrolls found < /Text> <
                        TouchableOpacity onPress = { this.props.getPayrolls } > < Text style = {
                            [styles.errorText, { color: SECONDARY_COLOR }] } > Tap to refresh < /Text></TouchableOpacity >
                        <
                        /View>} <
                        /View> <
                        /View>
                    );
                }
            }

            const mapStateToProps = (state) => ({
                payrolls: state.payrolls.payrolls,
                token: state.auth.token,
                isLoading: state.ui.isPayrollsLoading,
            });

            const mapDispatchToProps = dispatch => ({
                getPayrolls: () => dispatch(getPayrolls()),
                sendPayrolls: (month, year, group_id, company_id) => dispatch(sendPayrolls(month, year, group_id, company_id)),
            });


            export default connect(mapStateToProps, mapDispatchToProps)(PayrollScreen);