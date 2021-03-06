const {encrypt, decrypt } = require( "../src/cryptoService");

describe("crypto service", () => {
    it("can encrypt a string and then decrypt it", () => {

        const encryptedString = encrypt("odoacer@huns.gov");
        console.log(encryptedString);
        const decryptedString = decrypt(encryptedString);
        expect(decryptedString).toEqual("odoacer@huns.gov");
    });
});