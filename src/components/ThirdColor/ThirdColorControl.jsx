import React, { useContext } from "react";
import { ThirdColorContext } from "./ThirdColorContext";
import Arrow from "./Arrow";

const ThirdColorControl = (props) => {
    const SLIDER_HEIGHT = 128;
    const [blueValue, setBlueValue] = useContext(ThirdColorContext);    
    let blueAmount = 0;
    let sliderPosition = ( blueValue.thirdColorLevel / 16) * SLIDER_HEIGHT;

    const sliderContainerStyle = {
        marginLeft: "3px",
        marginRight: "5px",
        marginTop: "24px",
        position: "relative"
    }

    return <div style={sliderContainerStyle}>
            <Arrow />
            </div>;
};

//<div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
export default ThirdColorControl;