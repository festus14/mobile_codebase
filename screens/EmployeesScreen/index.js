import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { connect } from 'react-redux';
import { getEmployees } from '../../store/actions';
import defaultImage from '../../assets/images/myAvatar.png';
import { PHOTO_URL } from '../../utility/constants';
import MyImage from '../../components/MyImage';
import { getPercentage } from '../../utility/helpers';
import { SECONDARY_COLOR } from '../../utility/colors';

class EmployeesScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        if (this.props.employees.length < 1) {
            this.props.getEmployees();
        }
    }

    render() {
            const { employees = {}, isLoading, navigation } = this.props;
            return ( <
                    View style = { styles.container } >
                    <
                    Header title = "Employees" /
                    >
                    <
                    View style = {
                        { flex: 1, backgroundColor: '#fff' } } > {
                        employees.length > 0 && !isLoading ? ( < FlatList removeClippedSubviews data = { employees }
                            keyExtractor = {
                                (item, index) => `${index}` }
                            renderItem = {
                                ({ item, index }) => ( < TouchableOpacity style = { styles.item }
                                    onPress = {
                                        () => navigation.navigate('EmployeeDetailsNavigator', { employee: {...item, users: employees.length > 0 ? item.users : {} } }) } >
                                    <
                                    View style = { styles.top } >
                                    <
                                    Text style = { styles.topText } > { item.department.name } < /Text> <
                                    /View> <
                                    View style = { styles.middle } >
                                    <
                                    View >
                                    <
                                    Text style = { styles.name } > { item.firstname ? `${item.firstname} ${item.lastname}` : 'Unknown Unknown' } < /Text> <
                                    Text style = { styles.staffId } > { item.staff_no ? item.staff_no : '' } < /Text> <
                                    Text style = { styles.net } > { getPercentage(parseFloat(item.gross), 100) } < /Text> <
                                    /View> <
                                    MyImage resizeMode = "contain"
                                    style = { styles.image }
                                    source = { item.users ? [{ uri: PHOTO_URL + item.users.picture }, defaultImage] : [defaultImage] }
                                    /> <
                                    /View> <
                                    View style = { styles.bottom } >
                                    <
                                    TouchableOpacity style = {
                                        { flex: 1, justifyContent: 'center' } }
                                    onPress = {
                                        () => navigation.navigate('EmployeeDetailsNavigator', { employee: {...item, users: employees.length > 0 ? item.users : {} } }) } >
                                    <
                                    Text style = { styles.bottomText } > VIEW ALL < /Text> <
                                    /TouchableOpacity> <
                                    /View> <
                                    /TouchableOpacity>)}
                                    refreshControl = { <
                                        RefreshControl
                                        refreshing = { isLoading }
                                        onRefresh = { this.props.getEmployees }
                                        />
                                    }
                                    />): (isLoading ? < ActivityIndicator style = {
                                            { marginTop: 10 } }
                                        /> : <
                                        View style = { styles.error } >
                                        <
                                        Text style = { styles.errorText } > No employee found < /Text> <
                                        TouchableOpacity onPress = { this.props.getEmployees } > < Text style = {
                                            [styles.errorText, { color: SECONDARY_COLOR }] } > Tap to refresh < /Text></TouchableOpacity >
                                        <
                                        /View>)} <
                                        /View> <
                                        /View>
                                    );
                                }
                            }

                            const mapStateToProps = (state) => ({
                                isLoading: state.ui.isEmployeesLoading,
                                isDoneLoading: state.ui.isEmployeesDoneLoading,
                                employees: state.employees.employees,
                                user: state.user.user,
                            });

                            const mapDispatchToProps = dispatch => ({
                                getEmployees: () => dispatch(getEmployees()),
                            });

                            export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen);