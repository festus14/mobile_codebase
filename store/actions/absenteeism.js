import {
    SET_ABSENTEEISM,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    absenteeismUiStartLoading,
    absenteeismUiStopLoading,
    resetApp,
    getAuthToken,
} from './';

export const setAbsenteeism = absenteeism => {
    return {
        type: SET_ABSENTEEISM,
        absenteeism,
    };
};

export const getAbsenteeism = (id) => {
    return async (dispatch, getState) => {
        dispatch(absenteeismUiStartLoading());
        try {
            let token = await dispatch(getAuthToken());

            let res = await fetch(`${API_URL}employeeabsents/employee/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(absenteeismUiStopLoading());
            if (resJson.error || resJson.message === 'Unauthenticated.') {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setAbsenteeism(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(absenteeismUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};
