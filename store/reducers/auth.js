import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    expiry: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            console.warn(action.token);
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                expiry: action.expiry,
            };
        case AUTH_REMOVE_TOKEN:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
