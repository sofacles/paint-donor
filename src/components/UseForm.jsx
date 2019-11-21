import { useState } from "react";

const UseForm = ( submitCallback, validationRules ) => {

    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState(validationRules.emptyErrors);
    const { validationMap } = validationRules; 

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
            } else if(validationMap.requiredFields[propName].not) {
                if(propVal.trim() ===  validationMap.requiredFields[propName].not) {
                    errors[propName] = 
                    `${propName} is required`;
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

        if(validationMap.oneOf) {
            let atLeastOneItemExistsInOneOf = false;
            validationMap.oneOf.forEach(f => {
                if(fields[f] !== undefined) atLeastOneItemExistsInOneOf = true;
                return;
            })
            if(!atLeastOneItemExistsInOneOf) {
                errors = {
                    ...errors, 
                    atLeastOne: `Please provide at least one of ${validationMap.oneOf.join(", ")}`}
            } 
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
    
    
    const clearErrorFor = (propName) => {
        setErrors({
            ...errors,
            [propName] :  null
        });
    }

    const setField = (inputEvent) => {
        const propName = inputEvent.target.name;
        const propVal = inputEvent.target.value;
        clearErrorFor(propName);
        if(validationMap.oneOf && validationMap.oneOf.indexOf(propName) >= 0) {
            clearErrorFor("atLeastOne");
        }
        setFields({...fields, [propName]: propVal})
    };

    // handleMatches is about email and confirmEmail needing to match
    const blurField = (inputEvent, handleMatches = false) => {
        const propName = inputEvent.currentTarget.name;
        const propVal = inputEvent.target.value;
        let errorThisField = validateOneField(propName, propVal);
        setErrors({...errors, ...errorThisField});
        if(Object.keys(errorThisField).length === 0 && handleMatches) {
            let matchErrors = checkMismatches(fields);
            setErrors({...errors, ...matchErrors});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = validateAll(fields);
        setErrors(formErrors);
        if(Object.keys(formErrors).length === 0) {
            await submitCallback(fields);
        }
    };
    return {setField, blurField, errors, handleSubmit, validateOneField};
};

export default UseForm;