import React, { useContext } from 'react';
import { ThirdColorContext } from './ThirdColor/ThirdColorContext';
import OppositeColor from '../OppositeColor';

import CSS from 'csstype';
import '../App.css';

const HexValues = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];



const ColorPixel: React.FC<ColorPixelProps> = (props: ColorPixelProps) => {
  const hexValue = HexValues[props.r] + HexValues[props.g] + HexValues[props.b];
  const [blueValue, blueValueSet] = useContext(ThirdColorContext);
  const style: CSS.Properties = {
    backgroundColor: '#' + hexValue,
    border: `1px solid #${hexValue}`,
  };

  if (blueValue.selectedHexValue === hexValue + '') {
    style.border = `1px solid #${OppositeColor(hexValue)}`;
  }



  return (
    <div
      className="color-pixel"
      onClick={() => {
        blueValueSet({ ...blueValue, selectedHexValue: hexValue });
        props.updateSelectedValue(hexValue);
      }}
      style={style}
    />
  );
};


export { ColorPixel };
export type ColorPixelProps = {
  r: number, g: number, b: number,
  updateSelectedValue: (a: string) => void
}
