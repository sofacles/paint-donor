import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

export type ThirdColorInfo = {
  thirdColorLevel: number;
  selectedHexValue: string;
};

type ThirdColorContextValue = [ThirdColorInfo, Dispatch<SetStateAction<ThirdColorInfo>>];

export const ThirdColorContext = createContext<ThirdColorContextValue>([
  { thirdColorLevel: 7, selectedHexValue: '777' },
  () => new console.error("Hey, you can't use a ThirdColorContextValue outside of a provider... I guess?"),
]);

// The Red varies with the Y axis of color picker, Green varies with the X axis, and I have a slider
// component that changes the blue value of all the squares in the grid as it goes up and down.
// This context is all about blue: the "Third Color"

export const ThirdColorProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, setState] = useState<ThirdColorInfo>({
    thirdColorLevel: 7,
    selectedHexValue: '777',
  });

  return <ThirdColorContext.Provider value={[state, setState]}>{children}</ThirdColorContext.Provider>;
};
