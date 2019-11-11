const validationMap = {
    needToMatch: ["email", "confirmEmail"],
    requiredFields: {
        email: {
            minLength: 5
          },
        confirmEmail: {
            minLength: 5
        },
        quantity: {},
        brand: {},
        name: {},
        zipCode: {
            minLength: 5
          }
    },
};

const emptyErrors = {
    brand: "",
    name: "",
    email: "",
    confirmEmail: "",
    emailMatch: "",
    quantity: "",
    zipCode: ""
};

export default { validationMap, emptyErrors };