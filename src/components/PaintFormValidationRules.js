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
        name: {}
    },
};

const emptyErrors = {
    brand: "",
    name: "",
    email: "",
    confirmEmail: "",
    emailMatch: "",
    quantity: ""
};

export default { validationMap, emptyErrors };