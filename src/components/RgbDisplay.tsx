import React, { CSSProperties, useContext } from 'react';
import { ThirdColorContext } from './ThirdColor/ThirdColorContext';

export type RgbDisplayProps = {
  onColorChosen: (a: string) => void
}

const RgbDisplay: React.FC<RgbDisplayProps> = (props: RgbDisplayProps) => {
  const spanStyle: CSSProperties = {
    marginLeft: '10px',
  };

  const [thirdColorContext, setThirdColorContext] = useContext(ThirdColorContext);

  return (
    <span style={spanStyle}>
      <label htmlFor="rgbDisplay" className="hidden">
        Enter your best guess for the red, blue, green values for your paint, like #FF00000 for red. Or, you can skip
        ahead and take a picture of something that you painted with this color
      </label>
      <input
        data-testid="rgbDisplay"
        id="rgbDisplay"
        value={thirdColorContext.selectedHexValue}
        onFocus={() => {
          setThirdColorContext({ ...thirdColorContext, selectedHexValue: '' });
        }}
        onChange={(e) => {
          if (e.preventDefault) {
            e.preventDefault();
          }
          setThirdColorContext({
            ...thirdColorContext,
            selectedHexValue: e.target.value,
          });
          props.onColorChosen(e.target.value);
        }}
      />
    </span>
  );
};

export { RgbDisplay };
