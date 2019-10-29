import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getNodeText, getByTitle } from "@testing-library/dom";
import ColorPicker from "./ColorPicker";
import { ThirdColorProvider } from "./ThirdColor/ThirdColorContext";

afterEach(cleanup);
describe("Color Picker", () => {
  it("updates the selected color", () => {
    let colorPassedToCallback = "notSet";
    const onColorSelected = color => {
      colorPassedToCallback = color;
    };
    const { container } = render(
      <ThirdColorProvider>
        <ColorPicker onColorChosen={onColorSelected} />
      </ThirdColorProvider>
    );

    const selectedColorElement = container.querySelector(".selected-color");

    fireEvent.click(document.querySelectorAll(".color-pixel")[8]);

    const selectedColor = getNodeText(selectedColorElement);
    expect(selectedColor).toBe("#F80");

    expect(colorPassedToCallback).toBe("#F80");
  });

  it("considers the third color value when it updates the selected color", () => {
    let colorPassedToCallback = "notSet";
    const onColorSelected = color => {
      colorPassedToCallback = color;
    };
    const { container } = render(
      <ThirdColorProvider>
        <ColorPicker onColorChosen={onColorSelected} />
      </ThirdColorProvider>
    );

    // Click the up arrow 8 times, so we have a blue value of 8
    Array(8).fill().forEach(() => {
      const upArrow = document.querySelectorAll("div [title='increase blue']")[0];
      fireEvent.click(upArrow);
    });

    const selectedColorElement = container.querySelector(".selected-color");

    fireEvent.click(document.querySelectorAll(".color-pixel")[8]);

    const selectedColor = getNodeText(selectedColorElement);
    // expect the blue component to be half way to max (8)
    expect(selectedColor).toBe("#F88");

    expect(colorPassedToCallback).toBe("#F88");
  });
});
