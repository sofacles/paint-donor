import GiveAwayPaint from "./GiveAwayPaint";
import { BrowserRouter } from "react-router-dom"
import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react";

import { getByLabelText, getByTestId } from "@testing-library/dom";
import '@testing-library/jest-dom/extend-expect';

describe("GiveAwayPaint form", () => {
    let useStateSpy;

    beforeEach(() => {
      jest.clearAllMocks();
      jest.clearAllTimers();
      if(useStateSpy && useStateSpy.mockClear) {
        useStateSpy.mockClear();
      }
    });

    const updateInput = async (container, labelText, newValue, inputName) => {
      const theField = getByLabelText(container, labelText);  
      await fireEvent.change(theField, { target: { value: newValue, target: inputName }});
    };

    const setupFetchSpy = () => {
      const mockJsonPromise = Promise.resolve({});
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });

      let fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
        return mockFetchPromise}
      );

      return fetchSpy;
    };

    it("renders without throwing exceptions", () => {
        render(<GiveAwayPaint />);
    });

    it("POSTs a paint unit when you submit the form", async () => {
      const mockSuccessResponse = {};
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });

      let fetchSpy = setupFetchSpy();

      const someState = {
        brand: 'argentuil',
        quantity: 'half a fathom',
        email: 'someString',
        confirmEmail:  'someString',
        name: 'lime',
        rgb: '#333'
      };
  
      const { container } = render(<BrowserRouter><GiveAwayPaint /></BrowserRouter>);
      updateInput(container, "brand:", someState.brand, "brand");
      updateInput(container, "quantity:", someState.quantity, "quantity");
      updateInput(container, "email:", someState.email, "email");
      updateInput(container, "confirm email:", someState.confirmEmail, "confirmEmail");
      updateInput(container, "color name on can:", someState.name, "name");

      const colorField = getByTestId(container, "rgbDisplay");  
      fireEvent.change(colorField, { target: { value: someState.rgb, target: "rgbDisplay"  }});

      await fireEvent.submit(container.querySelector("form"));

      // It seems like this should work:
      // expect(fetchSpy).toHaveBeenCalledWith("/api/paints", expect.stringContaining(JSON.stringify(someState)));

      // but I get:
      // Expected: StringContaining        "{\"rgb\":\"\",\"brand\":\"brandX\",\"name\":\"lime\",\"quantity\":\"lots\",\"email\":\"joe@schmo.com\"}"
      // Received: "/api/paints", {"body": "{\"rgb\":\"\",\"brand\":\"brandX\",\"name\":\"lime\",\"quantity\":\"lots\",\"email\":\"joe@schmo.com\"}", "headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "POST"}
      // which makes no sense to me
     
      let postBody = fetchSpy.mock.calls[0][1].body;

      expect(postBody).toEqual(JSON.stringify(someState));
    });

    it("does not POST an empty paint form", async () => {
      const { container } = render(<GiveAwayPaint />);
      let fetchSpy = setupFetchSpy();
      await fireEvent.submit(container.querySelector("form"));

      expect(fetchSpy.mock.calls.length).toEqual(0);
    });

    describe("Error messages when a single field is missing", () => {
      let container;
      let fetchSpy;
      beforeEach(() => {
        container = render(<GiveAwayPaint />).container;
        fetchSpy = setupFetchSpy();
      });
      it("shows missing name Errors", async () => {
        updateInput(container, "brand:", "argentuil", "brand");
        updateInput(container, "quantity:", "half a fathom", "quantity");
        updateInput(container, "email:", "someString", "email");
        updateInput(container, "confirm email:", "someString", "confirmEmail");
  
        await fireEvent.submit(container.querySelector("form"));
        expect(fetchSpy.mock.calls.length).toEqual(0);
        expect(container.querySelector("p.error span").textContent).toBe("name is required");
      });
  
      it("shows missing brand Errors", async () => {
        updateInput(container, "color name on can:", "savage", "name");
        updateInput(container, "quantity:", "half a fathom", "quantity");
        updateInput(container, "email:", "someString", "email");
        updateInput(container, "confirm email:", "someString", "confirmEmail");
  
        await fireEvent.submit(container.querySelector("form"));
        expect(fetchSpy.mock.calls.length).toEqual(0);
        expect(container.querySelector("p.error span").textContent).toBe("brand is required");
      });

      it("shows missing email Errors", async () => {
        updateInput(container, "color name on can:", "savage", "name");
        updateInput(container, "brand:", "argentuil", "brand");
        updateInput(container, "quantity:", "half a fathom", "quantity");
        updateInput(container, "confirm email:", "someString", "confirmEmail");
  
        await fireEvent.submit(container.querySelector("form"));
        expect(fetchSpy.mock.calls.length).toEqual(0);
        expect(container.querySelector("p.error span").textContent).toBe("email is required");
      });
  
      it("shows missing brand confirmEmail", async () => {
        updateInput(container, "color name on can:", "savage", "name");
        updateInput(container, "brand:", "argentuil", "brand");
        updateInput(container, "quantity:", "half a fathom", "quantity");
        updateInput(container, "email:", "someString", "email");
  
        await fireEvent.submit(container.querySelector("form"));
        expect(fetchSpy.mock.calls.length).toEqual(0);
        expect(container.querySelector("p.error span").textContent).toBe("confirmEmail is required");
      });
  
    });
    
    
    it("shows missing brand Error on blur", async () => {
      const { container } = render(<GiveAwayPaint />);
      fireEvent.click(getByLabelText(container, "brand:"));
      fireEvent.blur(getByLabelText(container, "brand:"));
      expect(container.querySelector("p.error span").textContent).toBe("brand is required");
    });

    it("Shows the color picker when you click on the RGB icon", () => {
      const { container } = render(<div><div id="modal-root"></div><GiveAwayPaint /></div>);
      fireEvent.click(getByTestId(container, "rgbIconLink"));
      expect(document.getElementsByClassName("color-picker-container").length).toBeGreaterThan(0);
    });
}); 