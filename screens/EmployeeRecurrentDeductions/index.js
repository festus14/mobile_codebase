import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getRecurrentDeductions } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOR } from '../../utility/colors';


class EmployeeRecurrentDeductions extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Recurrent Deductions',
        drawerIcon: ({tintColor}) => (
            <Icon name="minus" color={tintColor} size={20} />
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
        this.props.getRecurrentDeductions(employee.id);
    }

    render() {
        const { recurrentDeductions, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Recurrent Deductions"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    {recurrentDeductions.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={recurrentDeductions}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => (
                            <PaymentsItem item={item}  />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={this.getThis}
                            />
                        }
                    />) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <View>
                    <Text style={styles.error}>No recurrent deductions found</Text>
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
    recurrentDeductions: state.payslips.recurrentDeductions,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getRecurrentDeductions: (id) => dispatch(getRecurrentDeductions(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRecurrentDeductions);
