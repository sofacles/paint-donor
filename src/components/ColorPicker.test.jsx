import React from "react";
import {
  render,
  cleanup,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getNodeText, getByTitle } from "@testing-library/dom";
import ColorPicker from "./ColorPicker";
import {ThirdColorProvider} from "./ThirdColorContext";

afterEach(cleanup);
describe("Color Picker", () => {
  
  it("updates the selected color", () => {
    let colorPassedToCallback = "notSet";
    const onColorSelected = (color) => {
      colorPassedToCallback = color;
    }
    const { container } = render(<ThirdColorProvider>
      <ColorPicker onColorChosen={onColorSelected} />
    </ThirdColorProvider>  );

    expect(getByTitle(container, "slider")).not.toBe(undefined);

    const selectedColorElement = container.querySelector('.selected-color');

    fireEvent.click(document.querySelectorAll(".color-pixel")[8]);

    const selectedColor = getNodeText(selectedColorElement);
    expect(selectedColor).toBe("#F80");

    expect(colorPassedToCallback).toBe("#F80");

  });


  it("considers the third color value when it updates the selected color", () => {
    const halfWayDownTheSlider = 64;
    let colorPassedToCallback = "notSet";
    const onColorSelected = (color) => {
      colorPassedToCallback = color;
    }
    const { container } = render(<ThirdColorProvider>
      <ColorPicker onColorChosen={onColorSelected} />
    </ThirdColorProvider>  );

  // Set the slider to about half way down the groove  
  fireEvent.mouseDown(getByTitle(container, "axis"), {
      currentTarget: {
        getBoundingClientRect: () => ({
          top: 100
        })
      },
      clientY: halfWayDownTheSlider
    });

    const selectedColorElement = container.querySelector('.selected-color');

    fireEvent.click(document.querySelectorAll(".color-pixel")[8]);

    const selectedColor = getNodeText(selectedColorElement);
    // expect the blue component to be half way to max (8)
    expect(selectedColor).toBe("#F88");

    expect(colorPassedToCallback).toBe("#F88");

  });
});
