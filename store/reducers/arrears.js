import { SET_ARREARS } from '../actions/actionTypes';

const initialState = {
    arrears: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARREARS:
            return {
                ...state,
                arrears: action.arrears,
            };
        default:
            return state;
    }
};

export default reducer;
