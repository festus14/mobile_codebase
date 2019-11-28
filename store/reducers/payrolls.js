import { SET_PAYROLLS, SET_PAYROLL_DETAILS } from '../actions/actionTypes';

const initialState = {
    payrolls: [],
    payrollDetails: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYROLLS:
            return {
                ...state,
                payrolls: action.payrolls,
            };
        case SET_PAYROLL_DETAILS:
            return {
                ...state,
                payrollDetails: action.payrollDetails,
            };
        default:
            return state;
    }
};

export default reducer;
