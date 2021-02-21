const validationMap = {
  needToMatch: ['email', 'confirmEmail'],
  requiredFields: {
    email: {
      minLength: 5,
    },
    confirmEmail: {
      minLength: 5,
    },
  },
};

const emptyErrors = {
  email: '',
  confirmEmail: '',
  emailMatch: '',
};

export default { validationMap, emptyErrors };
