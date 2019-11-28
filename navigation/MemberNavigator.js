import React from 'react';
import { Platform } from 'react-native';
import {
    createBottomTabNavigator,
} from 'react-navigation';
import DashboardNavigator from './DashboardNavigator';
// import ReportsNavigator from './ReportsNavigator';
import EmployeesNavigator from './EmployeesNavigator';
import SettingsNavigator from './SettingsNavigator';
import PayrollNavigator from './PayrollNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    DARK_GREEN,
} from '../utility/colors';
import { SCREEN_HEIGHT } from '../utility/constants';

const MemberNavigator = createBottomTabNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Dashboard: DashboardNavigator,
    Employees: EmployeesNavigator,
    Payroll: PayrollNavigator,
    // Reports: ReportsNavigator,
    Settings: SettingsNavigator,
}, {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: ({
        navigation,
    }) => ({
        tabBarIcon: ({
            tintColor,
        }) => {
            const {
                routeName,
            } = navigation.state;
            let iconName;

            switch (routeName) {
                case 'Settings':
                    iconName = 'cog';
                    break;
                case 'Dashboard':
                    iconName = 'tachometer';
                    break;
                case 'Employees':
                    iconName = 'users';
                    break;
                case 'Payroll':
                    iconName = 'money';
                    break;
                    // case 'Reports':
                    //     iconName = 'file';
                    //     break;
                default:
                    break;
            }

            // You can return any component that you like here!
            return <Icon name = { iconName }
            color = { tintColor }
            size = { 20 }
            />;
        },
    }),
    tabBarOptions: {
        activeTintColor: DARK_GREEN,
        inactiveTintColor: '#888',
        labelStyle: {
            fontSize: 11,
        },
        tabStyle: {
            justifyContent: 'center',
            height: '80%',
        },
        style: {
            backgroundColor: '#f9f9f9',
            height: SCREEN_HEIGHT * 0.1,
            borderTopWidth: 0,
            ...Platform.select({
                ios: {
                    shadowColor: 'rgb(77, 84, 124)',
                    shadowOpacity: 0.09,
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                },
                android: {
                    elevation: 10,
                },
            }),
            alignItems: 'center',
        },
        keyboardHidesTabBar: true,
    },
});

export default MemberNavigator;