const PaintChip = require("../../models/PaintCan");
const mongoose = require("mongoose");
const { PaintCanSchema, PaintCan } = PaintChip(mongoose);

describe("Need to have either RGB or image name", () => {
  test("Validating Empty PaintCan yields errors", () => {
    let pChip = new PaintCan(mongoose);
    try {
      pChip.validate(function(error) {
        expect(error.errors.email).not.toBe(null);
      });
    } catch (err) {
      expect(err).not.toBe(null);
      console.log("Exception caught in Model.test.js");
    }
  });

  test("Empty values for both RGB and imageName causes an error", async (done) => {
    let pChip = new PaintCan({
      brand: "Miller",
      zipCode: "11777",
      name: "avocado",
      rgb: "",
      imageName: "",
      quantity: "1 gal",
      email: "beyonce@gmail.com"
    });
    let result = "";
    try {
      result = await pChip.validate(function(error) {
        expect(error).not.toBe(null);
        done();
      });
    } catch (err) {
      expect(err).not.toBe(null);
    }
  });

  test("Valid RGB and and blank imageName is valid", async (done) => {
    let pChip = new PaintCan({
      brand: "Miller",
      zipCode: "11777",
      name: "avocado",
      rgb: "333",
      imageName: "",
      quantity: "1 gal",
      email: "beyonce@gmail.com"
    });
    let result = "";
    try {
      result = await pChip.validate(function(error) {
        expect(error).toBe(null);
        done();
      });
    } catch (err) {
      expect(err).not.toBe(null);
    }
  });

  test("Valid imageName and and blank RGB is valid", async (done) => {
    let pChip = new PaintCan({
      brand: "Miller",
      zipCode: "11777",
      name: "avocado",
      rgb: "",
      imageName: "898736.png",
      quantity: "1 gal",
      email: "beyonce@gmail.com"
    });
    let result = "";
    try {
      result = await pChip.validate(function(error) {
        expect(error).toBe(null);
        done();
      });
    } catch (err) {
      expect(err).not.toBe(null);
    }
  });
});
