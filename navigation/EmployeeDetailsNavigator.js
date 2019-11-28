import {
    createDrawerNavigator,
} from 'react-navigation';

import EmployeeDetails from '../screens/EmployeeDetails';
import EmployeePayslips from '../screens/EmployeePayslips';
import EmployeeAbsenteeism from '../screens/EmployeeAbsenteeism';
import EmployeeArrears from '../screens/EmployeeArrears';
import TopDrawer from '../components/TopDrawer';
import { DARK_GREEN } from '../utility/colors';
import EmployeeRecurrentPayments from '../screens/EmployeeRecurrentPayments';
import EmployeeDeductions from '../screens/EmployeeDeductions';
import EmployeePayments from '../screens/EmployeePayments';
import EmployeeRecurrentDeductions from '../screens/EmployeeRecurrentDeductions';
import { SCREEN_WIDTH } from '../utility/constants';

const EmployeesDetailsNavigator = createDrawerNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    EmployeeDetails,
    EmployeePayslips,
    EmployeeAbsenteeism,
    EmployeeArrears,
    EmployeePayments,
    EmployeeRecurrentPayments,
    EmployeeDeductions,
    EmployeeRecurrentDeductions,
}, {
    initialRouteName: 'EmployeeDetails',
    navigationOptions: {
        header: null,
    },
    drawerPosition: 'right',
    contentOptions: {
        activeTintColor: DARK_GREEN,
    },
    contentComponent: TopDrawer,
    drawerWidth: SCREEN_WIDTH * 0.7,
});
export default EmployeesDetailsNavigator;
