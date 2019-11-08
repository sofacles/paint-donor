import { useState } from "react";
const UseForm = ( submitCallback, validationRules ) => {
    const [fields, setFields] = useState({});
    
    const [errors, setErrors] = useState(validationRules.emptyErrors);
    
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
        setFields({...fields, [propName]: propVal})
    };

    // handleMatches is about email and confirmEmail needing to match
    const blurField = (inputEvent, handleMatches = false) => {
        const propName = inputEvent.currentTarget.name;
        const propVal = inputEvent.target.value;
        let errorThisField = validationRules.validateOneField(propName, propVal);
        setErrors({...errors, ...errorThisField});
        if(Object.keys(errorThisField).length === 0 && handleMatches) {
            let matchErrors = validationRules.checkMismatches(fields);
            setErrors({...errors, ...matchErrors});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = validationRules.validateAll(fields);
        setErrors(formErrors);
        if(Object.keys(formErrors).length === 0) {
            await submitCallback();
        }
    };

    return {fields, setFields, setField, blurField, errors, handleSubmit};
};

export { UseForm }