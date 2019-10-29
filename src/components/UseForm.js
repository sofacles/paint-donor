import { useState } from "react";
import { checkMismatches, validateAll } from "./PaintFormValidationRules";

const UseForm = ( submitCallback, validateOneField ) => {
    const [fields, setFields] = useState({});
    let emptyErrors = {
        brand: "",
        name: "",
        email: "",
        confirmEmail: "",
        emailMatch: "",
        quantity: ""
    };
    const [errors, setErrors] = useState(emptyErrors);
    
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
            await submitCallback();
        }
    };

    return {fields, setFields, setField, blurField, errors, handleSubmit};
};

export { UseForm }