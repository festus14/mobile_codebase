import React, { Component } from 'react';
import { View, ActivityIndicator, Text, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PayslipItem from '../../components/PayslipItem';
import { connect } from 'react-redux';
import { getPayrollDetails } from '../../store/actions';
import { SECONDARY_COLOR } from '../../utility/colors';


class PayrollDetails extends Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        this.getThis();
    }

    getThis = () => {
        const item = this.props.navigation.getParam('item', {});
        this.props.getPayrollDetails(item.month, item.year, item.group_id);
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { payslips, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payroll Details"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                />
                <View style={styles.data}>
                    {payslips.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={payslips}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => (
                            <PayslipItem item={item} payrolls={true}/>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={this.getThis}
                            />
                        }
                    />) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> :
                    <View style={styles.error}>
                        <Text style={styles.errorText}>No payslip found</Text>
                        <TouchableOpacity onPress={this.getThis}><Text style={[styles.errorText, { color: SECONDARY_COLOR }]}>Tap to refresh</Text></TouchableOpacity>
                    </View>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    payslips: state.payrolls.payrollDetails,
    isLoading: state.ui.isPayrollsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayrollDetails: (month, year, group_id) => dispatch(getPayrollDetails(month, year, group_id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PayrollDetails);
