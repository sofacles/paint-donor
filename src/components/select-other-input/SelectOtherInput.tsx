import React, { useState, useRef, useEffect } from 'react';
import FlexSelect from './FlexSelect';

interface eventArgs {
    target: {
        name: string;
        value: string;
    };
}

interface SelectOtherInputProps {
    id?: string;
    initialValues: string[];
    label: string;
    okText?: string;
    onNewValue: (newValue: string) => void;
    onBlur: (event: eventArgs) => void;

}
const SelectOtherInput: React.FC<SelectOtherInputProps> = ({
    onNewValue,
    onBlur,
    initialValues,
    label,
    id = 'gloriousControl',
    okText = 'OK',
}: SelectOtherInputProps) => {
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customTextVal, setCustomTextVal] = useState('');
    const [
        desiredSelectedValueOfFlexSelect,
        setDesiredSelectedValueOfFlexSelect,
    ] = useState('beta');
    const [stringsImShowing, setStringsImShowing] = useState(initialValues);
    const inputBox = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputBox.current !== null) {
            inputBox.current.focus();
        }
    }, [showCustomInput]);

    const spaceRight = {
        marginRight: '10px',
    };

    const customTextHelper = () => {
        if (customTextVal === '') {
            //treat this as the user just trying to toggle <select> back to visible
            setShowCustomInput(false);
            setDesiredSelectedValueOfFlexSelect(stringsImShowing[0]);
            setShowCustomInput(false);
            onNewValue(stringsImShowing[0]);
            return;
        }
        setStringsImShowing([...stringsImShowing].concat(customTextVal));
        setDesiredSelectedValueOfFlexSelect(customTextVal);
        setShowCustomInput(false);
        onNewValue(customTextVal);
    };

    const controlToShow = showCustomInput ? (
        <div>
            <label style={spaceRight}>{label}</label>
            <input
                style={spaceRight}
                name={id}
                type="text"
                ref={inputBox}
                placeholder="enter new value"
                value={customTextVal}
                onChange={(e) => {
                    setCustomTextVal(e.target.value);
                }}
                onBlur={(e) => {
                    customTextHelper();
                    onBlur(e);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        customTextHelper();
                    }
                }}
            />
            <button
                onClick={() => {
                    customTextHelper();
                }}
            >
                {okText}
            </button>
        </div>
    ) : (
        <>
            <label style={spaceRight} htmlFor={id}>
                {label}
            </label>
            <FlexSelect
                selectedValue={desiredSelectedValueOfFlexSelect}
                id={id}
                onChange={(v: string) => {
                    setCustomTextVal(v);
                    setDesiredSelectedValueOfFlexSelect(v);
                    onNewValue(v);
                }}
                onBlur={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    onBlur(e);
                }}
                userWantsToCreateCustomValue={(showInputBox: boolean) => {
                    setShowCustomInput(showInputBox);
                    if (showInputBox === true) setCustomTextVal('');
                }}
                stringsToShow={stringsImShowing}
            />
        </>
    );

    return <div>{controlToShow}</div>;
};

export default SelectOtherInput;
