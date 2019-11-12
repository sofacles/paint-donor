import OppositeColor from "./OppositeColor";
describe("Opposite Color", () => {
    it("should increase all the digits by 8", () => {
        expect(OppositeColor("000")).toEqual("888");
    });

    it("should wrap to zero if necessary", () => {
        const compl = OppositeColor("888");
        console.log(`For 888 we get back ${compl}`);
        expect(compl).toEqual("000");
    });
    
    it("should parse hex digits that are letters", () => {
        expect(OppositeColor("19E")).toEqual("916");
    });

    it("should return hex digits that are letters", () => {
        expect(OppositeColor("75C")).toEqual("fd4");
    });
});