import { SET_PAYSLIPS, SET_PAYMENTS, SET_RECURRENT_PAYMENTS, SET_RECURRENT_DEDUCTIONS, SET_DEDUCTIONS } from '../actions/actionTypes';

const initialState = {
    payslips: [],
    payments: [],
    recurrentPayments: [],
    recurrentDeductions: [],
    deductions: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYSLIPS:
            return {
                ...state,
                payslips: action.payslips,
            };
        case SET_PAYMENTS:
            return {
                ...state,
                payments: action.payments,
            };
        case SET_RECURRENT_PAYMENTS:
            return {
                ...state,
                recurrentPayments: action.recurrentPayments,
            };
        case SET_RECURRENT_DEDUCTIONS:
            return {
                ...state,
                recurrentDeductions: action.recurrentDeductions,
            };
        case SET_DEDUCTIONS:
            return {
                ...state,
                deductions: action.deductions,
            };
        default:
            return state;
    }
};

export default reducer;
