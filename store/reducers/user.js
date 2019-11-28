import { SET_USER, RESET_USER, SET_EMPLOYEE } from '../actions/actionTypes';

const initialState = {
    user: {},
    employee: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case SET_EMPLOYEE:
            return {
                ...state,
                employee: action.employee,
            };
        case RESET_USER:
            return initialState;
        default:
            return state;
    }
};

export default reducer
;