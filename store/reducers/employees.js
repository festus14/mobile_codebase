import { SET_EMPLOYEES, SET_NOTIFICATIONS } from "../actions/actionTypes";

const initialState = {
    employees: [],
    notifications: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_EMPLOYEES:
        return {
            ...state,
            employees: action.employees,
        };
    case SET_NOTIFICATIONS:
        return {
            ...state,
            notifications: action.notifications,
        };
    default:
        return state;
    }
}

export default reducer