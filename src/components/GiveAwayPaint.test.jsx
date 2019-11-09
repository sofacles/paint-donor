import GiveAwayPaint from "./GiveAwayPaint";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { getByLabelText, getByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
const querystring = require("querystring");

jest.mock("axios");

describe("GiveAwayPaint form", () => {
  let useStateSpy;
  const resp = {
    data: {
      status: 200
    }
  };
  axios.post.mockResolvedValue(resp);

  const updateInput = async (container, labelText, newValue, inputName) => {
    const theField = getByLabelText(container, labelText);
    await fireEvent.change(theField, {
      target: { value: newValue, name: inputName }
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    if (useStateSpy && useStateSpy.mockClear) {
      useStateSpy.mockClear();
    }
  });

  it("renders without throwing exceptions", () => {
    render(<GiveAwayPaint />);
  });

  it("POSTs a paint unit when you submit the form", async () => {
    const someState = {
      brand: "argentuil",
      quantity: "half a fathom",
      email: "someString",
      confirmEmail: "someString",
      name: "lime",
      rgb: "#333"
    };

    const { container, getByLabelText } = render(
      <BrowserRouter>
        <GiveAwayPaint />
      </BrowserRouter>
    );
    const brandField = getByLabelText("brand:");
    fireEvent.change(brandField, {
      target: { value: someState.brand, name: "brand" }
    });
    fireEvent.change(getByLabelText("quantity:"), {
      target: { value: someState.quantity, name: "quantity" }
    });
    fireEvent.change(getByLabelText("email:"), {
      target: { value: someState.email, name: "email" }
    });
    fireEvent.change(getByLabelText("confirm email:"), {
      target: { value: someState.confirmEmail, name: "confirmEmail" }
    });
    
    const nameField = getByLabelText("color name on can:");
    await fireEvent.change(nameField, {
      target: { value: "lime", name: "name" }
    });

    const colorField = getByTestId(container, "rgbDisplay");
    fireEvent.change(colorField, {
      target: { value: someState.rgb, target: "rgbDisplay" }
    });

    await fireEvent.submit(container.querySelector("form"));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post.mock.calls[0][0]).toEqual(
      `/api/paints?${querystring.encode(someState)}`
    );
  });

  // TODO figure out how to test photo upload

  it("does not POST an empty paint form", async () => {
    const { container } = render(<GiveAwayPaint />);
    await fireEvent.submit(container.querySelector("form"));

    expect(axios.post).toHaveBeenCalledTimes(0);
  });

  describe("Error messages when a single field is missing", () => {
    let container;
    beforeEach(() => {
      container = render(<GiveAwayPaint />).container;
    });
    it("shows missing name Errors", async () => {
      updateInput(container, "brand:", "argentuil", "brand");
      updateInput(container, "quantity:", "half a fathom", "quantity");
      updateInput(container, "email:", "someString", "email");
      updateInput(container, "confirm email:", "someString", "confirmEmail");

      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "name is required"
      );
    });

    it("shows missing brand Errors", async () => {
      updateInput(container, "color name on can:", "savage", "name");
      updateInput(container, "quantity:", "half a fathom", "quantity");
      updateInput(container, "email:", "someString", "email");
      updateInput(container, "confirm email:", "someString", "confirmEmail");

      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "brand is required"
      );
    });

    it("shows missing email Errors", async () => {
      updateInput(container, "color name on can:", "savage", "name");
      updateInput(container, "brand:", "argentuil", "brand");
      updateInput(container, "quantity:", "half a fathom", "quantity");
      updateInput(container, "confirm email:", "someString", "confirmEmail");

      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "email is required"
      );
    });

    it("shows missing brand confirmEmail", async () => {
      updateInput(container, "color name on can:", "savage", "name");
      updateInput(container, "brand:", "argentuil", "brand");
      updateInput(container, "quantity:", "half a fathom", "quantity");
      updateInput(container, "email:", "someString", "email");

      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "confirmEmail is required"
      );
    });
  });

  it("shows missing brand Error on blur", async () => {
    const { container } = render(<GiveAwayPaint />);
    fireEvent.click(getByLabelText(container, "brand:"));
    fireEvent.blur(getByLabelText(container, "brand:"));
    expect(container.querySelector("p.error span").textContent).toBe(
      "brand is required"
    );
  });

  it("Shows the color picker when you click on the RGB icon", () => {
    const { container } = render(
      <div>
        <div id="modal-root"></div>
        <GiveAwayPaint />
      </div>
    );
    fireEvent.click(getByTestId(container, "rgbIconLink"));
    expect(
      document.getElementsByClassName("color-picker-container").length
    ).toBeGreaterThan(0);
  });
});
