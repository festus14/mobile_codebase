import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PayslipItem from '../../components/PayslipItem';
import { connect } from 'react-redux';
import { getPayslips } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SECONDARY_COLOR } from '../../utility/colors';


class EmployeePayslips extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Payslips',
        drawerIcon: ({tintColor}) => (
            <Icon name="print" color={tintColor} size={20} />
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
        this.props.getPayslips(employee.id);
    }

    render() {
        const { payslips, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payslips"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    {payslips.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={payslips}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => (
                            <PayslipItem item={item} />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={this.getThis}
                            />
                        }
                    />) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <View>
                        <Text style={styles.error}>No payslips found</Text>
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
    payslips: state.payslips.payslips,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayslips: (id) => dispatch(getPayslips(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeePayslips);
