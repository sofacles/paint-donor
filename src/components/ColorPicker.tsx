import React, { useContext } from 'react';
import '../App.css';
import { ColorPixel } from './ColorPixel';
import ThirdColorControl from './ThirdColor/ThirdColorControl';
import { ThirdColorContext } from './ThirdColor/ThirdColorContext';
import { TwoDotAxisLabel } from './TwoDotAxisLabel';
import OppositeColor from '../OppositeColor';

import CSS from 'csstype';

interface ColorPickerProps {
  onColorChosen: (color: string) => void
}

const ColorPicker: React.FC = (props: ColorPickerProps) => {
  const COLOR_MAX = 15;
  const [blueValue] = useContext(ThirdColorContext);

  // Each row will have all the possible values of green for the given value of red
  const rows: HTMLDivElement[] = [];
  const onNewValue = (color) => {
    props.onColorChosen(color);
  };


  for (let rValue = COLOR_MAX; rValue >= 0; rValue--) {
    const cells: typeof ColorPixel[] = [];
    for (let gValue = 0; gValue <= COLOR_MAX; gValue++) {
      cells.push(
        <ColorPixel
          updateSelectedValue={onNewValue}
          r={rValue}
          g={gValue}
          b={blueValue.thirdColorLevel}
          key={'' + rValue + gValue}
        />
      );
    }
    rows.push(
      <div key={rValue} className="color-row">
        {cells}
      </div>
    );
  }

  const selectedColorStyle: CSS.Properties = {
    backgroundColor: '#' + blueValue.selectedHexValue,
    color: '#' + OppositeColor(blueValue.selectedHexValue),
  };

  return (
    <div className="color-picker-container">
      <div className="color-picker-holder">
        <TwoDotAxisLabel color="#f00" />
        <div>
          <TwoDotAxisLabel orientation="horizontal" color="#0f0" />
          <div className="color-picker">{rows}</div>
        </div>
        <ThirdColorControl />
      </div>
      <div className="selected-color" style={selectedColorStyle}>
        {blueValue.selectedHexValue !== 'choose color' && '#'}
        {blueValue.selectedHexValue}
      </div>
      <img alt="" src="/api/pageview?pg=colorPicker" />
    </div>
  );
};

export default ColorPicker;
