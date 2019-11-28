import {
    createStackNavigator
} from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';

const SettingsNavigator = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    SettingsScreen
}, {
    initialRouteName: 'SettingsScreen',
})
export default SettingsNavigator;