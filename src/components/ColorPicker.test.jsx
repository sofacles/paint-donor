import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { getNodeText, getByTitle } from "@testing-library/dom";
import ColorPicker from "./ColorPicker";
import { ThirdColorProvider } from "./ThirdColor/ThirdColorContext";

afterEach(cleanup);
describe("Color Picker", () => {

  it("starts out on gray", () => {
    const { container } = render(
      <ThirdColorProvider>
        <ColorPicker onColorChosen={c => {}} />
      </ThirdColorProvider>
    );
    const selectedColor = getNodeText(container.querySelector(".selected-color"));
    expect(selectedColor).toBe("#777");
  });

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
    fireEvent.click(container.querySelectorAll(".color-pixel")[8]);

    const selectedColor = getNodeText(selectedColorElement);
    expect(selectedColor).toBe("#F87");

    expect(colorPassedToCallback).toBe("F87");
  });

  it("considers the third color value when it updates the selected color by clicking on a cell", () => {
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
      fireEvent.mouseDown(upArrow);
    });

    const selectedColorElement = container.querySelector(".selected-color");

    fireEvent.click(document.querySelectorAll(".color-pixel")[8]);

    const selectedColor = getNodeText(selectedColorElement);
    // expect the blue component to be half way to max (8)
    expect(selectedColor).toBe("#F8F");

    expect(colorPassedToCallback).toBe("F8F");
  });

  it("updates the selected color just by clicking on the up arrow", () => {
    const { container } = render(
      <ThirdColorProvider>
        <ColorPicker onColorChosen={c => {}} />
      </ThirdColorProvider>
    );

    fireEvent.mouseDown(container.querySelector("div [title='increase blue']"));
    const selectedColor = getNodeText(container.querySelector(".selected-color"));
    
    expect(selectedColor).toBe("#778");
  })
});
