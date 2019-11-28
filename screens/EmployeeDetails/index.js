import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import defaultImage from '../../assets/images/myAvatar.png';
import { PHOTO_URL } from '../../utility/constants';
import MyImage from '../../components/MyImage';
import EmployeeItem from '../../components/EmployeeItem';
import { getPercentage } from '../../utility/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class EmployeeDetails extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Employee Info',
        drawerIcon: ({tintColor}) => (
            <Icon name="user" color={tintColor} size={20} />
        ),
    }

    openDrawer = () => {
        this.props.navigation.openDrawer({
            employee: this.props.navigation ? this.props.navigation.getParam('employee', {}) : this.props.employee,
        });
    }

    render() {
        let { navigation, employee } = this.props;

        employee = navigation ? navigation.getParam('employee', {}) : employee;
        return (
            <View style={styles.container}>
                <Header
                    title={`${employee.firstname} ${employee.lastname}` || 'Unknown Unknown'}
                    leftIcon="md-arrow-back"
                    onLeftPress={() => navigation.goBack(null)}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                        <View style={styles.personal}>
                            <MyImage resizeMode="contain" style={styles.image} source={employee.users ? [{ uri: PHOTO_URL + employee.users.picture }, defaultImage] : [defaultImage]} />
                            <View style={styles.personalText}>
                                <Text style={styles.name}>{`${employee.firstname} ${employee.middlename || ''} ${employee.lastname}` || 'Unknown Unknown'}</Text>
                                <Text style={styles.email}>{employee.email || 'mail@domain.com'}</Text>
                                {employee.staff_no && <Text style={styles.staffId}>{employee.staff_no}</Text>}
                                {employee.phone && <Text style={styles.staffId}>{employee.phone}</Text>}
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.section}>
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionTitle}>Payroll Data</Text>
                                <View style={[styles.itemContainer, { marginVertical: 10 }]}>
                                    <Text style={[styles.itemTextOne, { fontSize: 15 }]}>Gross Salary ({employee.currency ? employee.currency.name : 'NGN'})</Text>
                                    <Text style={[styles.itemTextTwo, { fontSize: 17, fontWeight: 'bold' }]}>{getPercentage(parseFloat(employee.gross), 100)}</Text>
                                </View>
                                {employee.pay_elements && employee.pay_elements.map(elem => (
                                    <View style={styles.itemContainer} key={elem.id}>
                                        <Text style={styles.itemTextOne}>{elem.name}</Text>
                                        <Text style={styles.itemTextTwo}>{getPercentage(parseFloat(employee.gross), parseFloat(elem.percentage))}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionTitle}>Personal Info</Text>
                                <EmployeeItem title="Gender" value={employee.gender} />
                                <EmployeeItem title="DOB" value={employee.dob} />
                                <EmployeeItem title="DOE" value={employee.date_of_employment} />
                                {employee.country && <EmployeeItem title="Country" value={employee.country.name} />}
                                {employee.state && <EmployeeItem title="Residence State" value={employee.state.name} />}
                                {employee.origin && <EmployeeItem title="State of Origin" value={employee.origin.name} />}
                                <EmployeeItem title="Position" value={employee.position} />
                                {employee.department && <EmployeeItem title="Department" value={employee.department.name} />}
                                {employee.stafftype && <EmployeeItem title="Staff Type" value={employee.stafftype && employee.stafftype.name} />}
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionTitle}>Account Info</Text>
                                {employee.employee_bank && <EmployeeItem title="Employee Bank" value={employee.employee_bank.name} />}
                                <EmployeeItem title="Account Number" value={employee.account_number} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionTitle}>Pension & Tax Info</Text>
                                <EmployeeItem title="TIN" value={employee.tin} />
                                <EmployeeItem title="Payer ID" value={employee.taxpayer_id} />
                                <EmployeeItem title="Tax Aauthority" value={employee.tax_authority} />
                                <EmployeeItem title="PFA" value={employee.pfa} />
                                <EmployeeItem title="RSA PIN" value={employee.rsa_pin} />
                                {employee.p_bank && <EmployeeItem title="Pension Bank" value={employee.p_bank.name} />}
                                <EmployeeItem title="Pension Account Number" value={employee.p_acc_number} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionTitle}>Reliefs</Text>
                                <EmployeeItem title="CRA" value={employee.cra} />
                                <EmployeeItem title="Fixed CRA" value={employee.fixed_cra} />
                                <EmployeeItem title="Pension" value={employee.pension} />
                                <EmployeeItem title="NHF" value={employee.nhf} />
                                <EmployeeItem title="Dependable Relative" value={employee.dependable_relative} />
                                <EmployeeItem title="Children" value={employee.children} />
                                <EmployeeItem title="Disability" value={employee.disability} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionTitle}>Deductions</Text>
                                <EmployeeItem title="Pension Deduction" value={employee.pension_deduction} />
                                <EmployeeItem title="NHF Deduction" value={employee.nhf_deduction} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
