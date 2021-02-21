import React, { createContext, useState } from 'react';

const ThirdColorContext = createContext([]);

// The Red varies with the Y axis of color picker, Green varies with the X axis, and I have a slider
// component that changes the blue value of all the squares in the grid as it goes up and down.
// This context is all about blue: the "Third Color"

const ThirdColorProvider = (props) => {
  const [state, setState] = useState({
    thirdColorLevel: 7,
    selectedHexValue: '777',
  });
  return (
    <ThirdColorContext.Provider value={[state, setState]}>
      {props.children}
    </ThirdColorContext.Provider>
  );
};

export { ThirdColorContext, ThirdColorProvider };
