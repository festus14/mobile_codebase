import {
    AUTH_REMOVE_TOKEN,
    AUTH_SET_TOKEN,
} from './actionTypes';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import {
    uiStartLoading,
    uiStopLoading,
    setUser,
    resetApp,
} from './';
import {
    API_URL,
} from '../../utility/constants';
import NavigationService from '../../NavigationService';
import { isAdmin, sendRequest } from '../../utility/helpers';
import moment from 'moment';

export const authSetToken = (token, userId, expiry) => {
    return {
        type: AUTH_SET_TOKEN,
        token,
        userId,
        expiry,
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN,
    };
};

export const authStoreAsyncData = (token, userId, userData, expiry) => {
    return async dispatch => {
        dispatch(authSetToken(token, userId, expiry));
        try {
            await RNSecureKeyStore.set('userId', JSON.stringify(userId), { accessible: ACCESSIBLE.WHEN_UNLOCKED });
            await RNSecureKeyStore.set('auth-token', token, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
            await RNSecureKeyStore.set('user-data', JSON.stringify(userData), { accessible: ACCESSIBLE.WHEN_UNLOCKED });
            await RNSecureKeyStore.set('auth-expiry-date', expiry, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
        } catch (error) {
            console.warn(error);
        }
    };
};

export const authRemoveAsyncData = () => {
    return async() => {
        try {
            await RNSecureKeyStore.set('userId', JSON.stringify(''), { accessible: ACCESSIBLE.WHEN_UNLOCKED });
            await RNSecureKeyStore.set('auth-token', '', { accessible: ACCESSIBLE.WHEN_UNLOCKED });
            await RNSecureKeyStore.set('user-data', JSON.stringify(''), { accessible: ACCESSIBLE.WHEN_UNLOCKED });
            await RNSecureKeyStore.set('auth-expiry-date', '', { accessible: ACCESSIBLE.WHEN_UNLOCKED });
        } catch (error) {
            console.warn(error);
        }
    };
};

export const logIn = (authData, noNavigate) => {
    return async(dispatch, getState) => {
        try {
            dispatch(uiStartLoading());
            await dispatch(authRemoveAsyncData());

            setTimeout(() => {
                if (!res) {
                    dispatch(uiStopLoading());
                    return 'Please check your internet connection';
                }
            }, 15000);

            let res = await sendRequest(`${API_URL}login`, 'POST', { email: authData.email, password: authData.password });

            let resJson = await res.json();
            console.warn(resJson);

            await dispatch(uiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                return resJson.error === 'Unauthorised' ? 'Email and password do not match' : 'Authentication failed, please try again';
            } else {
                dispatch(authStoreAsyncData(resJson.success.token, resJson.success.user.id, authData, resJson.success.expiry_date.date));
                dispatch(setUser(resJson.success.user));
                if (!noNavigate) {
                    if (isAdmin(getState().user.user.role)) {
                        NavigationService.navigate('MemberNavigator');
                    } else {
                        NavigationService.navigate('EmployeeMainNavigator');
                    }
                }
            }
        } catch (error) {
            dispatch(uiStopLoading());
            console.warn(error);
            return 'Authentication failed, please check your internet connection and try again';
        }
    };
};

export const getAuthToken = () => {
    return async(dispatch, getState) => {
        let token = getState().auth.token;

        let expiryDate = getState().auth.expiry;
        if (!token || moment(expiryDate).add(59, 'minutes') <= moment()) {
            try {
                token = await RNSecureKeyStore.get('auth-token');
                expiryDate = await RNSecureKeyStore.get('auth-expiry-date');
                let userId = await RNSecureKeyStore.get('userId');
                userId = JSON.parse(userId);
                let userData = await RNSecureKeyStore.get('user-data');
                userData = JSON.parse(userData);

                if (!token || !userData) {
                    return false;
                }

                if (moment(expiryDate).add(59, 'minutes') <= moment()) {
                    await dispatch(logIn(userData, true));
                    return getState().auth.token;
                } else {
                    dispatch(authSetToken(token, userId));
                    return token;
                }
            } catch (error) {
                await dispatch(resetApp());
                console.warn(error);
                return '';
            }
        } else {
            return token;
        }
    };
};

export const logout = () => {
    return async(dispatch, getState) => {
        try {
            dispatch(uiStartLoading());

            let token = await dispatch(getAuthToken());

            setTimeout(() => {
                if (!res) {
                    dispatch(uiStopLoading());
                    return 'Please check your internet connection';
                }
            }, 15000);

            let res = await sendRequest(`${API_URL}api_logout`, 'POST', {}, {}, token);

            let resJson = await res.json();
            console.warn(resJson);

            if (resJson.error || resJson.message === 'Unauthenticated.') {
                alert('Logout failed, please try again');
                dispatch(uiStopLoading());
                return '';
            } else {
                dispatch(resetApp());
                dispatch(uiStopLoading());
                return 'done';
            }
        } catch (error) {
            alert('Logout failed, please try check your internet connection and try again');
            dispatch(uiStopLoading());
            return '';
        }
    };
};