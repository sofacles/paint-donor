import React, { useContext } from "react";
import { ThirdColorContext } from "./ThirdColorContext";
import Arrow from "./Arrow";

const ThirdColorControl = (props) => {
    const [blueValue, setBlueValue] = useContext(ThirdColorContext);    
    // blueAmount can go from 0 to 15
    let blueAmount = 0;
    const MAX_COLOR = 15;
    const upClick = () => {
        setBlueValue(b => {
            if(b.thirdColorLevel < MAX_COLOR ) {
                return {
                    ...blueValue,
                    thirdColorLevel: b.thirdColorLevel + 1
                };
            }
            return { ...blueValue };
        });
    };

    const downClick = () => {
        setBlueValue(b => {
            if(b.thirdColorLevel > 0 ) {
                return {
                    ...blueValue,
                    thirdColorLevel: b.thirdColorLevel - 1
                };
            }
            return { ...blueValue };
        });
    };

    const sliderContainerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "3px",
        marginRight: "5px",
        marginTop: "24px",
        position: "relative"
    }

    return <div style={sliderContainerStyle}>
            <Arrow direction="up" onClick={upClick} />
            <Arrow direction="down" onClick={downClick} />
            </div>;
};

//<div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
export default ThirdColorControl;