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

  const makeEventArgs = (name, val) => ({
    target: { value: val, name: name }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    if (useStateSpy && useStateSpy.mockClear) {
      useStateSpy.mockClear();
    }
  });

  it("renders without throwing exceptions", () => {
    render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
  });

  it("POSTs a paint unit when you submit the form", async () => {
    const someState = {
      brand: "Behr",
      quantity: "less than a gallon",
      email: "someString",
      confirmEmail: "someString",
      zipCode: "12121",
      name: "lime",
      rgb: "#333",
      sheen: ""
    };

    const { container, getByLabelText } = render(
      <BrowserRouter>
        <GiveAwayPaint />
      </BrowserRouter>
    );
    const brandField = getByLabelText("Brand:");
    fireEvent.change(brandField, {
      target: { value: "Behr", name: "brand" }
    });
    fireEvent.change(getByLabelText("Quantity:"), {
      target: { value: someState.quantity, name: "quantity" }
    });
    fireEvent.change(getByLabelText("Sheen:"), {
      target: { value: someState.sheen, name: "sheen" }
    });
    fireEvent.change(getByLabelText("Email:"), {
      target: { value: someState.email, name: "email" }
    });
    fireEvent.change(getByLabelText("Confirm Email:"), {
      target: { value: someState.confirmEmail, name: "confirmEmail" }
    });
    fireEvent.change(getByLabelText("Zip Code:"), {
      target: { value: someState.zipCode, name: "zipCode" }
    });
    
    const nameField = getByLabelText("Color Name:");
    await fireEvent.change(nameField, {
      target: { value: "lime", name: "name" }
    });

    const colorField = getByTestId(container, "rgbDisplay");
    fireEvent.change(colorField, {
      target: { value: someState.rgb, target: "rgbDisplay" }
    });

    await fireEvent.submit(container.querySelector("form"));
    expect(axios.post).toHaveBeenCalledTimes(1);
    const postUrl = decodeURI(axios.post.mock.calls[0][0] + "").replace("%23","#"); //%23 is #, is not decoded by decodeURI
    //My attempt at a deepEqual for querySting and an object
    const stateKeys = Object.keys(someState);
    stateKeys.forEach(k => {
      if(postUrl.indexOf(k) === -1) {
        console.log("******** problem with: " + k);
      }
      expect(postUrl.indexOf(k)).toBeGreaterThan(-1);

      if(postUrl.indexOf(someState[k]) === -1) {
        console.log(`******** problem with k: ${k}  + someState[k]: ${someState[k]}`);
      }
      expect(postUrl.indexOf(someState[k])).toBeGreaterThan( -1 );
    });
   
    expect((axios.post.mock.calls[0][0] + "").length).toEqual(
      (`/api/paints/?${querystring.encode(someState)}`).length);
  });

  // TODO figure out how to test photo upload

  it("does not POST an empty paint form", async () => {
    const { container } = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
    await fireEvent.submit(container.querySelector("form"));

    expect(axios.post).toHaveBeenCalledTimes(0);
  });

  describe("Error messages when a single field is missing", () => {
   
    it("shows missing name Errors", async () => {
      const {container, getByLabelText} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
      fireEvent.change(getByLabelText("Brand:"), makeEventArgs("brand", "Behr"));
      fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
      fireEvent.change(getByLabelText("Email:"), makeEventArgs("email", "someString"));
      fireEvent.change(getByLabelText("Confirm Email:"), makeEventArgs("confirmEmail", "someString"));
      fireEvent.change(getByLabelText("Zip Code:"), makeEventArgs("zipCode", "99999"));

      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "name is required"
      );
    });

    it("shows missing brand Errors", async () => {
      const {container, getByLabelText} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
      fireEvent.change(getByLabelText("Color Name:"), makeEventArgs("name", "savage"));
      fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
      fireEvent.change(getByLabelText("Email:"), makeEventArgs("email", "someString"));
      fireEvent.change(getByLabelText("Confirm Email:"), makeEventArgs("confirmEmail", "someString"));
      fireEvent.change(getByLabelText("Zip Code:"), makeEventArgs("zipCode", "99999"));

      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "brand is required"
      );
    });

    it("shows missing email Errors", async () => {
      const {container, getByLabelText} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
      fireEvent.change(getByLabelText("Color Name:"), makeEventArgs("name", "savage"));
      fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
      fireEvent.change(getByLabelText("Brand:"), makeEventArgs("brand", "Behr"));
      fireEvent.change(getByLabelText("Confirm Email:"), makeEventArgs("confirmEmail", "someString"));
      fireEvent.change(getByLabelText("Zip Code:"), makeEventArgs("zipCode", "99999"));
      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "email is required"
      );
    });

    it("shows missing confirmEmail error", async () => {
      const {container, getByLabelText} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
      fireEvent.change(getByLabelText("Color Name:"), makeEventArgs("name", "savage"));
      fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
      fireEvent.change(getByLabelText("Brand:"), makeEventArgs("brand", "Behr"));
      fireEvent.change(getByLabelText("Email:"), makeEventArgs("email", "someString"));
      fireEvent.change(getByLabelText("Zip Code:"), makeEventArgs("zipCode", "99999"));
      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "confirmEmail is required"
      );
    });

    it("shows missing zip code error", async () => {
      const {container, getByLabelText} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
      fireEvent.change(getByLabelText("Color Name:"), makeEventArgs("name", "savage"));
      fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
      fireEvent.change(getByLabelText("Brand:"), makeEventArgs("brand", "Behr"));
      fireEvent.change(getByLabelText("Email:"), makeEventArgs("email", "someString"));
      fireEvent.change(getByLabelText("Confirm Email:"), makeEventArgs("confirmEmail", "someString"));
      await fireEvent.submit(container.querySelector("form"));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector("p.error span").textContent).toBe(
        "zipCode is required"
      );
    });
  });

  it("shows missing brand Error on blur", async () => {
    const { container, getByLabelText } = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
    fireEvent.click(getByLabelText("Brand:"));
    fireEvent.blur(getByLabelText( "Brand:"));
    expect(container.querySelector("p.error span").textContent).toBe(
      "brand is required"
    );
  });

  it("Shows the color picker when you click on the RGB icon", () => {
    const { container } = render(
      <div>
        <div id="modal-root"></div>
        <BrowserRouter><GiveAwayPaint /></BrowserRouter>
      </div>
    );
    fireEvent.click(getByTestId(container, "rgbIconLink"));
    expect(
      document.getElementsByClassName("color-picker-container").length
    ).toBeGreaterThan(0);
  });

  it("Shows error and does not POST if no file uploaded nor RGB", async () => {
    const {container, getByLabelText, getByTestId} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
    fireEvent.change(getByLabelText("Color Name:"), makeEventArgs("name", "savage"));
    fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
    fireEvent.change(getByLabelText("Brand:"), makeEventArgs("brand", "Behr"));
    fireEvent.change(getByLabelText("Email:"), makeEventArgs("email", "someString"));
    fireEvent.change(getByLabelText("Confirm Email:"), makeEventArgs("confirmEmail", "someString"));
    fireEvent.change(getByLabelText("Zip Code:"), makeEventArgs("zipCode", "99999"));

    await fireEvent.submit(container.querySelector("form"));
   
    expect(axios.post.mock.calls.length).toEqual(0);
    expect(container.querySelector("p.error span").textContent).toBe(
      "Please provide at least one of rgb, uploadPhoto"
    );
  });

  it("POSTs if file is uploaded, but no RGB", async () => {
    const {container, getByLabelText, getByTestId} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
    fireEvent.change(getByLabelText("Color Name:"), makeEventArgs("name", "savage"));
    fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
    fireEvent.change(getByLabelText("Brand:"), makeEventArgs("brand", "Behr"));
    fireEvent.change(getByLabelText("Email:"), makeEventArgs("email", "someString"));
    fireEvent.change(getByLabelText("Confirm Email:"), makeEventArgs("confirmEmail", "someString"));
    fireEvent.change(getByLabelText("Zip Code:"), makeEventArgs("zipCode", "99999"));

    const fileInput = document.getElementById("uploadPhoto");
    const fileContents       = 'file contents';
    const file               = new Blob([fileContents], {type : 'multipart/form-data'});
    
    Object.defineProperty(fileInput, "files", {
      value: [file]
    });

    fireEvent.change(fileInput, file);

    await fireEvent.submit(container.querySelector("form"));
   
    expect(axios.post.mock.calls.length).toEqual(1);
    expect(container.querySelector("p.error span")).toBe(null);
    
  });

  it("POSTs if RGB is set but no file is uploaded, ", async () => {
    const {container, getByLabelText, getByTestId} = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
    fireEvent.change(getByLabelText("Color Name:"), makeEventArgs("name", "savage"));
    fireEvent.change(getByLabelText("Quantity:"), makeEventArgs("quantity", "less than a gallon"));
    fireEvent.change(getByLabelText("Brand:"), makeEventArgs("brand", "Behr"));
    fireEvent.change(getByLabelText("Email:"), makeEventArgs("email", "someString"));
    fireEvent.change(getByLabelText("Confirm Email:"), makeEventArgs("confirmEmail", "someString"));
    fireEvent.change(getByLabelText("Zip Code:"), makeEventArgs("zipCode", "99999"));

    const colorField = getByTestId("rgbDisplay");
    fireEvent.change(colorField, {
      target: { value: "333", target: "rgbDisplay" }
    });

    await fireEvent.submit(container.querySelector("form"));
   
    expect(axios.post.mock.calls.length).toEqual(1);
    expect(container.querySelector("p.error span")).toBe(null);
    
  });

  
});
