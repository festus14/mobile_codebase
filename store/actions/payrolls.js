import {
    SET_PAYROLLS, SET_PAYROLL_DETAILS,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    payrollsUiStartLoading,
    payrollsUiStopLoading,
    resetApp,
    getAuthToken,
} from './';

export const setPayrolls = payrolls => {
    return {
        type: SET_PAYROLLS,
        payrolls,
    };
};

export const setPayrollDetails = payrollDetails => {
    return {
        type: SET_PAYROLL_DETAILS,
        payrollDetails,
    };
};

export const getPayrolls = () => {
    return async (dispatch, getState) => {
        dispatch(payrollsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}payroll_approvals`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payrollsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setPayrolls(resJson));
                return resJson;
            }
        } catch (e) {
            dispatch(payrollsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const sendPayrolls = (month, year, group_id, company_id) => {
    return async (dispatch, getState) => {
        try {
            let token = await dispatch(getAuthToken());

            let body = JSON.stringify({
                month,
                year,
                company_id,
                unique_id: group_id,
            });

            let res = await fetch(`${API_URL}send_all_payslip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
                body,
            });
            let resJson = await res.json();

            console.warn(resJson);

            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                alert(resJson.message);
                return resJson;
            }
        } catch (e) {
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};



export const getPayrollDetails = (month, year, group_id) => {
    return async (dispatch, getState) => {
        dispatch(payrollsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let body = month ? JSON.stringify({
                month,
                year,
                unique_id: group_id,
            }) : undefined;

            let res = await fetch(`${API_URL}payrolls_details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',

                },
                body,
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payrollsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setPayrollDetails(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(payrollsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};
