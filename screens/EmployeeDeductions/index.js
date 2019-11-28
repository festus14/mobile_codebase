import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getDeductions } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SECONDARY_COLOR } from '../../utility/colors';


class EmployeeDeductions extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Deductions',
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
        this.props.getDeductions(employee.id);
    }

    render() {
        const { deductions, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Deductions"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    {deductions.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={deductions}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => (
                            <PaymentsItem item={item} />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={this.getThis}
                            />
                        }
                    />) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <View>
                        <Text style={styles.error}>No deductions found</Text>
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
    deductions: state.payslips.deductions,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getDeductions: (id) => dispatch(getDeductions(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDeductions);
