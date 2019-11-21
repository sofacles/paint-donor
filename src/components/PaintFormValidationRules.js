const validationMap = {
    needToMatch: ["email", "confirmEmail"],
    requiredFields: {
        email: {
            minLength: 5
          },
        confirmEmail: {
            minLength: 5
        },
        quantity: {
            not: "- choose -"
        },
        brand: {
            not: "- choose -"
        },
        name: {},
        zipCode: {
            minLength: 5
          }
    },
    oneOf: ["rgb", "uploadPhoto"],
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