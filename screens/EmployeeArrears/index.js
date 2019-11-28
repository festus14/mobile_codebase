import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import ArrearsItem from '../../components/ArrearsItem';
import { connect } from 'react-redux';
import { getArrears } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOR } from '../../utility/colors';


class EmployeeArrears extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Arrears',
        drawerIcon: ({tintColor}) => (
            <Icon name="user-plus" color={tintColor} size={20} />
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
        this.props.getArrears(employee.id);
    }

    render() {
        const { arrears, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Arrears"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    {arrears.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={arrears}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => (
                            <ArrearsItem item={item} />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={this.getThis}
                            />
                        }
                    />) : (isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <View>
                        <Text style={styles.error}>No arrears found</Text>
                        <TouchableOpacity onPress={this.getThis}>
                            <Text style={{ color: SECONDARY_COLOR, textAlign: 'center' }}>Tap to refresh</Text>
                        </TouchableOpacity>
                    </View>)}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    arrears: state.arrears.arrears,
    isLoading: state.ui.isArrearsLoading,
});

const mapDispatchToProps = dispatch => ({
    getArrears: (id) => dispatch(getArrears(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeArrears);
