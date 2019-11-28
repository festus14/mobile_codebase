const validate = (val, rules, field) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                if (!isValid) {
                    return `${field} is not valid`;
                }
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                if (!isValid) {
                    return `${field} length must be a minimum of ${rules[rule]}`;
                }
                break;
            case 'maxLength':
                isValid = isValid && maxLengthValidator(val, rules[rule]);
                if (!isValid) {
                    return `${field} length must be a maximum of ${rules[rule]}`;
                }
                break;
            case 'isString':
                isValid = isValid && stringValidator(val);
                if (!isValid) {
                    return `${field} is not valid`;
                }
                break;
            case 'isDate':
                isValid = isValid && dateValidator(val);
                if (!isValid) {
                    return `${field} is not valid`;
                }
                break;
            default:
                return null;
        }
    }
};

const emailValidator = (val) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase());
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const maxLengthValidator = (val, maxLength) => {
    return val.length <= maxLength;
};

const stringValidator = (val) => {
    return typeof val === 'string';
};

const dateValidator = (val) => {
    let date = new Date(val);
    if (!date) {
        return false;
    }
    return date instanceof Date;
};

export default validate;