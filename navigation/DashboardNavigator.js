import {
    createStackNavigator,
} from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import EmployeeDetailsNavigator from './EmployeeDetailsNavigator';

const DashboardNavigator = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    DashboardScreen,
    EmployeeDetailsDashboard: EmployeeDetailsNavigator,
}, {
    initialRouteName: 'DashboardScreen',
});

export default DashboardNavigator;