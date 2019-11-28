import NavigationService from '../../NavigationService';
import { authRemoveAsyncData } from './auth';

// ui actions
export { uiStartLoading, uiStopLoading, payrollsUiStartLoading, payrollsUiStopLoading, reportsUiStartLoading, reportsUiStopLoading, userUiStartLoading, userUiStopLoading, employeesUiStartLoading, employeesUiStopLoading, payslipsUiStartLoading, payslipsUiStopLoading, absenteeismUiStartLoading, absenteeismUiStopLoading, arrearsUiStartLoading, arrearsUiStopLoading }
from './ui';

// user actions
export { setUser, getUser, getUserId, getEmployee }
from './user';

// auth actions
export { logIn, authRemoveToken, authError, authSetToken, logout, authRemoveAsyncData, authStoreAsyncData, getAuthToken }
from './auth';

// employees actions
export { setEmployees, getEmployees, setNotifications, updateNotifications }
from './employees';

// payslips actions
export { getPayslips, getDeductions, getPayments, getRecurrentDeductions, getRecurrentPayments }
from './payslips';

// absenteeism actions
export { getAbsenteeism }
from './absenteeism';

// payrolls actions
export { getPayrolls, sendPayrolls, getPayrollDetails }
from './payrolls';

// arrears actions
export { getArrears }
from './arrears';

export const resetApp = () => {
    return async(dispatch) => {
        await dispatch(authRemoveAsyncData());
        dispatch(reset());
        NavigationService.navigate('AuthScreen');
    };
};

const reset = () => ({
    type: 'RESET_APP',
});