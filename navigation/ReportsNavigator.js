import {
    createStackNavigator
} from 'react-navigation';
import ReportsScreen from '../screens/ReportsScreen';

const ReportsNavigator = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    ReportsScreen
}, {
    initialRouteName: 'ReportsScreen',
})
export default ReportsNavigator;