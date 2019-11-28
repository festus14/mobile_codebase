import {
    SET_ARREARS,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    arrearsUiStartLoading,
    arrearsUiStopLoading,
    resetApp,
    getAuthToken,
} from './';

export const setArrears = arrears => {
    return {
        type: SET_ARREARS,
        arrears,
    };
};

export const getArrears = (id) => {
    return async (dispatch, getState) => {
        dispatch(arrearsUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}employeeareas/employee/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(arrearsUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setArrears(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(arrearsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};
