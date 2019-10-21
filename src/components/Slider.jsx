import React, { useContext } from "react";
import { ThirdColorContext } from "./ThirdColorContext"

const Slider = (props) => {
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
    
    const grooveStyle = {
        height: "98%",
        width: "2px",
        backgroundColor: "#000"
    }
    
    const sliderStyle =  {
        width: "12px",
        height: "4px",
        backgroundColor: "rgba(16, 34, 3)",
        position: "absolute",
        left: "-6px",
        bottom: sliderPosition + "px"
   }

    return <div style={sliderContainerStyle}>
        <div 
            style={grooveStyle}
            title={props.title + "axis"}
            onMouseDown={(evt) => {
                let topOfGroove = evt.currentTarget.getBoundingClientRect().top;
                let fromSliderTop = evt.clientY - topOfGroove;
                blueAmount = Math.floor((SLIDER_HEIGHT - fromSliderTop) * 16 / SLIDER_HEIGHT);
                setBlueValue({ ...blueValue, thirdColorLevel: blueAmount});
            }}
        ></div>
        <div style={sliderStyle} title={props.title + "slider"}></div>
    </div>;
};

Slider.defaultProps = {
    title: ""
}

export default Slider;