import React from 'react';
import { Provider } from 'react-redux';
import configStore from './store/';
import MainAppNavigator from './navigation/MainAppNavigator';
import NavigationService from './NavigationService';

const store = configStore();

export default function App() {
    return ( <
        Provider store = { store } >
        <
        MainAppNavigator ref = {
            navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }
        }
        /> <
        /Provider>
    );
}