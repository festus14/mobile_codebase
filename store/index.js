import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import employeesReducer from './reducers/employees';
import payslipsReducer from './reducers/payslips';
import absenteeismReducer from './reducers/absenteeism';
import payrollsReducer from './reducers/payrolls';
import arrearsReducer from './reducers/arrears';

// This combines the reducers into one root reducer
const appReducer = combineReducers({
    ui: uiReducer,
    user: userReducer,
    auth: authReducer,
    employees: employeesReducer,
    payslips: payslipsReducer,
    absenteeism: absenteeismReducer,
    payrolls: payrollsReducer,
    arrears: arrearsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
        state = undefined;
    }
    return appReducer(state, action);
};

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;