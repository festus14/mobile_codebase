import React, { Component } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getRecurrentPayments } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SECONDARY_COLOR } from '../../utility/colors';


class EmployeeRecurrentPayments extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Recurrent Payments',
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
        this.props.getRecurrentPayments(employee.id);
    }

    render() {
        const { recurrentPayments, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Recurrent Payments"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    {recurrentPayments.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={recurrentPayments}
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
                    <Text style={styles.error}>No recurrent payments found</Text>
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
    recurrentPayments: state.payslips.recurrentPayments,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getRecurrentPayments: (id) => dispatch(getRecurrentPayments(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRecurrentPayments);
