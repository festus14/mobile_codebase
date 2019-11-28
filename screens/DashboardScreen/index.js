import React, { PureComponent } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import defaultImage from '../../assets/images/myAvatar.png';
import { styles } from './style';
import Button from '../../components/Button';
import { DARK_GREEN } from '../../utility/colors';
import { getEmployee } from '../../store/actions';
import { PHOTO_URL } from '../../utility/constants';
import MyImage from '../../components/MyImage';

class DashboardScreen extends PureComponent {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        if (!this.props.employee.firstname && this.props.user.employee_id) {
            this.props.getEmployee();
        }
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    render() {
        const { user, employee } = this.props;
        return ( <
            SafeAreaView style = { styles.container } >
            <
            View style = { styles.rando }
            /> <
            View style = { styles.imageContainer } > < MyImage resizeMode = "contain"
            style = { styles.image }
            source = { user ? [{ uri: PHOTO_URL + user.picture }, defaultImage] : [defaultImage] }
            /></View >
            <
            Text style = { styles.name } > { user.name || 'Moore Dagogo-Hart' } < /Text> <
            Text style = { styles.email } > { user.email || 'mail@domain.com' } < /Text> <
            Text style = { styles.company } > { employee.company ? employee.company.name : 'Not an employee' } < /Text> <
            Text style = { styles.staffId } > { employee.department ? employee.department.name : '' } < /Text> <
            Text style = { styles.staffId } > { employee.location ? employee.location.name : '' } < /Text> <
            Text style = { styles.staffId } > { employee.firstname ? employee.staff_no : '' } < /Text> {
                employee.firstname && < Button
                text = "Details"
                style = {
                    { backgroundColor: DARK_GREEN, marginTop: 20 } }
                onPress = {
                    () => this.props.navigation.navigate('EmployeeDetailsDashboard', { employee: {...employee, users: employee.users || user } }) }
                />} <
                /SafeAreaView>
            );
        }
    }

    const mapStateToProps = state => ({
        isLoading: state.ui.isUserLoading,
        isDoneLoading: state.ui.isUserDoneLoading,
        employee: state.user.employee,
        user: state.user.user,
    });

    const mapDispatchToProps = dispatch => ({
        getEmployee: () => dispatch(getEmployee()),
    });

    export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);