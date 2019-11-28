import { SET_ABSENTEEISM } from '../actions/actionTypes';

const initialState = {
    absenteeism: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ABSENTEEISM:
            return {
                ...state,
                absenteeism: action.absenteeism,
            };
        default:
            return state;
    }
};

export default reducer;
