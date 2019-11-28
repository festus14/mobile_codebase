import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import AuthScreen from '../screens/AuthScreen';
import MemberNavigator from './MemberNavigator';
import EmployeeMainNavigator from './EmployeeMainNavigator';

const MainAppNavigator = createAppContainer(createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthScreen,
    MemberNavigator,
    EmployeeMainNavigator,
}, {
    initialRouteName: 'AuthScreen',
    navigationOptions: {
        header: null,
    },
}));

export default MainAppNavigator;