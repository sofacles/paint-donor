import React, { useContext } from "react";
import { ThirdColorContext } from "./ThirdColorContext";
import Arrow from "./Arrow";

const ThirdColorControl = () => {
  const [blueValue, setBlueValue] = useContext(ThirdColorContext);

  const MAX_COLOR = 15;
  const upClick = (event) => {
    event.preventDefault();
    setBlueValue(b => {
      
      if (b.thirdColorLevel < MAX_COLOR) {
        const oldBlu = parseInt(b.selectedHexValue[2], 16);
        let newBlu = oldBlu + 1;

        return {
          ...blueValue,
          thirdColorLevel: b.thirdColorLevel + 1,
          selectedHexValue: (b.selectedHexValue.substring(0,2) + newBlu.toString(16)).toUpperCase()
        };
      }
      return { ...blueValue };
    });

    return false;
  };

  const downClick = (event) => {
    event.preventDefault();
    setBlueValue(b => {
      if (b.thirdColorLevel > 0) {
        const oldBlu = parseInt(b.selectedHexValue[2], 16);
        let newBlu = oldBlu - 1;

        return {
          ...blueValue,
          thirdColorLevel: b.thirdColorLevel - 1,
          selectedHexValue: (b.selectedHexValue.substring(0,2) + newBlu.toString(16)).toUpperCase()
        };
      }
      return { ...blueValue };
    });

    return false;
  };

  const sliderContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "3px",
    marginRight: "5px",
    marginTop: "24px",
    position: "relative"
  };

  return (
    <div style={sliderContainerStyle}>
      <div title="increase blue" onMouseDown={upClick} onTouchStart={upClick}>
        <Arrow direction="up"  />
      </div>
      
      <div title="decrease blue" onMouseDown={downClick} onTouchStart={downClick}>
        <Arrow direction="down" />
      </div>
    </div>
  );
};

//<div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
export default ThirdColorControl;
