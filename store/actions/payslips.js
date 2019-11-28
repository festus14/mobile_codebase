import {
    SET_PAYSLIPS,
    SET_PAYMENTS,
    SET_RECURRENT_PAYMENTS,
    SET_DEDUCTIONS,
    SET_RECURRENT_DEDUCTIONS,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    payslipsUiStartLoading,
    payslipsUiStopLoading,
    resetApp,
    getAuthToken,
} from './';

export const setPayslips = payslips => {
    return {
        type: SET_PAYSLIPS,
        payslips,
    };
};

export const setPayments = payments => {
    return {
        type: SET_PAYMENTS,
        payments,
    };
};

export const setDeductions = deductions => {
    return {
        type: SET_DEDUCTIONS,
        deductions,
    };
};

export const setRecurrentPayments = recurrentPayments => {
    return {
        type: SET_RECURRENT_PAYMENTS,
        recurrentPayments,
    };
};

export const setRecurrentDeductions = recurrentDeductions => {
    return {
        type: SET_RECURRENT_DEDUCTIONS,
        recurrentDeductions,
    };
};

export const getPayslips = (userId) => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}payrolls/payslips/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',

                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setPayslips(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};



export const getPayments = (id) => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}employee_payments/employee/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setPayments(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const getDeductions = (id) => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}employee_deductions/employee/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setDeductions(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};


export const getRecurrentPayments = (id) => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}employee_recurrent_payments/employee/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setRecurrentPayments(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const getRecurrentDeductions = (id) => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}employee_recurrent_deductions/employee/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setRecurrentDeductions(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};
