import React, { useContext } from "react";
import { ThirdColorContext } from "./ThirdColor/ThirdColorContext";

const RgbDisplay = (props) => {
    let spanStyle = {
        marginLeft: "10px"
    };
    
    const [thirdColorContext, setThirdColorContext ] = useContext(ThirdColorContext);
    
    return <span style={spanStyle}>
            <label htmlFor="rgbDisplay" className="hidden"> 
                Enter your best guess for the red, blue, green values for your paint, like #FF00000 for red.  Or, you
                can skip ahead and take a picture of something that you painted with this color
            </label>
            <input
                data-testid="rgbDisplay"
                id="rgbDisplay"
                value={thirdColorContext.selectedHexValue}
                onFocus={(e) => {
                    setThirdColorContext({...thirdColorContext,
                        selectedHexValue: ''});
                    }
                }
                onChange={(e) => {
                    if(e.preventDefault) {
                        e.preventDefault();
                    }
                    setThirdColorContext({...thirdColorContext,
                    selectedHexValue: e.target.value});
                    props.onColorChosen(e.target.value)
                }}
            />
        </span>
}

export { RgbDisplay };