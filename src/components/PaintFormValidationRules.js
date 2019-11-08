const validationMap = {
    needToMatch: ["email", "confirmEmail"],
    requiredFields: {
        email: {
            minLength: 5
          },
        confirmEmail: {
            minLength: 5
        },
        quantity: {},
        brand: {},
        name: {}
    },
};

const validateOneField = (propName, propVal) => {
    let errors = {};
    if(validationMap.requiredFields.hasOwnProperty(propName)) {
        if(!propVal) {
            errors[propName] = `${propName} is required`;
        }
        else if(validationMap.requiredFields[propName].minLength) {
            if(propVal.length < validationMap.requiredFields[propName].minLength) {
                errors[propName] = 
                `${propName} needs to be at least ${validationMap.requiredFields[propName].minLength} characters long`;
            }
        }
    }
    return errors;
}

const validateAll = (values) => {
    let errors = {};
    const requiredFields = Object.keys(validationMap.requiredFields);
    for(let i=0; i < requiredFields.length; i++) {
        errors = {...errors, ...validateOneField(requiredFields[i], values[requiredFields[i]])}
    }
    return errors;
}

const checkMismatches = (fields) => {
    const errors = {};
    if( validationMap.needToMatch ) {
        let firstFieldThatNeedsToMatch = validationMap.needToMatch[0];
        //If they make changes in the confirmEmail field before the email field is touched, no error
        if(fields[firstFieldThatNeedsToMatch] && fields[firstFieldThatNeedsToMatch].length > 0) {
            if(fields[validationMap.needToMatch[1]] !== fields[firstFieldThatNeedsToMatch] ) {
                errors[validationMap.needToMatch[1]] = `email and confirm email need to match `;
            }
        }
    }
    return errors;
};

const emptyErrors = {
    brand: "",
    name: "",
    email: "",
    confirmEmail: "",
    emailMatch: "",
    quantity: ""
};

export { validateOneField, checkMismatches, validateAll, emptyErrors };