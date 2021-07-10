import React, { ChangeEvent } from 'react';
//A <select> that renders an option for each string in props.StringsToShow, controlled by props.selectedValue
// props.onChange will not be called if the selected option is "other". userWantsToCreateCustomValue is called with true
// in that case.

export type FlexSelectProps = {
  id: string,
  onBlur: (e: ChangeEvent<HTMLSelectElement>) => void,
  onChange: (newVal: string) => void,
  selectedValue: string,
  stringsToShow: string[],
  userWantsToCreateCustomValue: (showInputBox: boolean) => void
}

const FlexSelect: React.FC<FlexSelectProps> = (props: FlexSelectProps) => {
  const ourOptions = props.stringsToShow.map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ));

  return (
    <>
      <select
        id={props.id}
        onChange={(e) => {
          props.onChange(e.target.value);
          if (e.target.value === 'other') {
            props.userWantsToCreateCustomValue(true);
          } else {
            props.userWantsToCreateCustomValue(false);
          }
        }}
        onBlur={(e) => {
          props.onBlur(e);
        }}
        value={props.selectedValue}
      >
        {ourOptions}
      </select>
    </>
  );
};

export default FlexSelect;
