import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    USER_UI_START_LOADING,
    USER_UI_STOP_LOADING,
    EMPLOYEES_UI_STOP_LOADING,
    EMPLOYEES_UI_START_LOADING,
    ABSENTEEISM_UI_STOP_LOADING,
    ABSENTEEISM_UI_START_LOADING,
    PAYROLLS_UI_STOP_LOADING,
    PAYROLLS_UI_START_LOADING,
    ARREARS_UI_STOP_LOADING,
    ARREARS_UI_START_LOADING,
    PAYSLIPS_UI_STOP_LOADING,
    PAYSLIPS_UI_START_LOADING,
} from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING,
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING,
    };
};

export const userUiStartLoading = () => {
    return {
        type: USER_UI_START_LOADING,
    };
};

export const userUiStopLoading = () => {
    return {
        type: USER_UI_STOP_LOADING,
    };
};

export const employeesUiStartLoading = () => {
    return {
        type: EMPLOYEES_UI_START_LOADING,
    };
};

export const employeesUiStopLoading = () => {
    return {
        type: EMPLOYEES_UI_STOP_LOADING,
    };
};

export const payslipsUiStartLoading = () => {
    return {
        type: PAYSLIPS_UI_START_LOADING,
    };
};

export const payslipsUiStopLoading = () => {
    return {
        type: PAYSLIPS_UI_STOP_LOADING,
    };
};

export const absenteeismUiStartLoading = () => {
    return {
        type: ABSENTEEISM_UI_START_LOADING,
    };
};

export const absenteeismUiStopLoading = () => {
    return {
        type: ABSENTEEISM_UI_STOP_LOADING,
    };
};

export const payrollsUiStartLoading = () => {
    return {
        type: PAYROLLS_UI_START_LOADING,
    };
};

export const payrollsUiStopLoading = () => {
    return {
        type: PAYROLLS_UI_STOP_LOADING,
    };
};

export const arrearsUiStartLoading = () => {
    return {
        type: ARREARS_UI_START_LOADING,
    };
};

export const arrearsUiStopLoading = () => {
    return {
        type: ARREARS_UI_STOP_LOADING,
    };
};