import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getPayments } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SECONDARY_COLOR } from '../../utility/colors';


class EmployeePayments extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Payments',
        drawerIcon: ({tintColor}) => (
            <Icon name="plus" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        this.getThis();
    }

    goBack = () => {
        this.props.navigation.goBack(null);
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    getThis = () => {
        const employee = this.props.navigation.getParam('employee', {});
        this.props.getPayments(employee.id);
    }

    render() {
        const { payments, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payments"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    {payments.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={payments}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => (
                            <PaymentsItem item={item}/>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={this.getThis}
                            />
                        }
                    />) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <View>
                    <Text style={styles.error}>No payments found</Text>
                        <TouchableOpacity onPress={this.getThis}>
                            <Text style={{ color: SECONDARY_COLOR, textAlign: 'center' }}>Tap to refresh</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    payments: state.payslips.payments,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayments: (id) => dispatch(getPayments(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeePayments);
