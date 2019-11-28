import {
    createStackNavigator
} from 'react-navigation';
import PayrollScreen from '../screens/PayrollScreen';
import PayrollDetails from '../screens/PayrollDetails';

const PayrollNavigator = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    PayrollScreen,
    PayrollDetails,
}, {
    initialRouteName: 'PayrollScreen',
})
export default PayrollNavigator;