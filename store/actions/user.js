import {
    SET_USER,
    SET_EMPLOYEE,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    userUiStartLoading,
    userUiStopLoading,
    resetApp,
    getAuthToken,
} from './';
import { setNotifications } from './employees';
import RNSecureKeyStore from 'react-native-secure-key-store';

export const setUser = (user) => {
    return {
        type: SET_USER,
        user,
    };
};

export const setEmployee = (employee) => {
    return {
        type: SET_EMPLOYEE,
        employee,
    };
};

export const getUserId = () => {
    return async(dispatch, getState) => {
        try {
            let userId = await getState().auth.userId;
            if (!userId) {
                userId = await RNSecureKeyStore.get('userId');
            }
            return userId;
        } catch (error) {
            console.warn(error);
            return false;
        }
    };
};

export const getUser = () => {
    return async(dispatch, getState) => {
        dispatch(userUiStartLoading());
        try {
            let userData = await getState().user.user;

            if (!userData.email) {
                let token = await dispatch(getAuthToken());
                let userId = await dispatch(getUserId());

                let res = await fetch(`${API_URL}users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                    },
                });
                let resJson = await res.json();

                console.warn(resJson);

                await dispatch(userUiStopLoading());
                if (resJson.error || resJson.message === 'Unauthenticated.') {
                    if (resJson.message === 'Unauthenticated.') {
                        dispatch(resetApp());
                    }
                    alert(resJson.error || 'Something went wrong, pls try again');
                    return false;
                } else {
                    dispatch(setUser(resJson.success));
                    return resJson.user;
                }
            } else {
                await dispatch(userUiStopLoading());
                return userData;
            }
        } catch (e) {
            dispatch(userUiStopLoading());
            console.warn(e);
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const getEmployee = () => {
    return async(dispatch, getState) => {
        dispatch(userUiStartLoading());
        try {
            let userData = getState().user.employee;

            if (!userData.first_name) {
                let token = await dispatch(getAuthToken());
                let employeeId = getState().user.user.employee_id;

                console.warn(token);

                let res = await fetch(`${API_URL}employees/${employeeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                    },
                });
                let resJson = await res.json();
                console.warn(resJson);

                await dispatch(userUiStopLoading());
                if (resJson.error || resJson.message === 'Unauthenticated.') {
                    if (resJson.message === 'Unauthenticated.') {
                        dispatch(resetApp());
                    }
                    alert(resJson.error || 'Something went wrong, pls try again');
                    return false;
                } else {
                    dispatch(setEmployee(resJson.success));
                    dispatch(setNotifications(resJson.success.notification));
                    return resJson;
                }
            } else {
                await dispatch(userUiStopLoading());
                return userData;
            }
        } catch (e) {
            dispatch(userUiStopLoading());
            console.warn(e);
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};