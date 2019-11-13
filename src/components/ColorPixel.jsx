import React, { useContext } from "react";
import "../App.css";
import { ThirdColorContext } from "./ThirdColor/ThirdColorContext";

const HexValues = ['0', '1', '2', '3','4', '5', '6','7', '8',
'9', 'A','B','C','D','E','F' ];

const ColorPixel = (props) => {
    const hexValue =  HexValues[props.r] + HexValues[props.g] + HexValues[props.b];
    const [blueValue, blueValueSet] = useContext(ThirdColorContext);
    let style = {
        backgroundColor: "#" + hexValue
    }

    return (<div className="color-pixel" 
                onClick={(evt) => {
                    blueValueSet({ ...blueValue, 
                        selectedHexValue: hexValue
                    });
                    props.updateSelectedValue(hexValue);
                }}
                style={style}/>)
};

export { ColorPixel }