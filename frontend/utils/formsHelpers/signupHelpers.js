export function createInputListForSignup(
  name,
  username,
  email,
  password,
  passwordConfirmation
) {
  const ALL_INPUTS = [
    {
      label: "Name",
      htmlFor: "name",
      type: "text",
      value: name,
      valid: false,
      touched: false,
      rules: {
        minLength: 3,
        isAlpha: true,
      },
    },
    {
      label: "Username",
      htmlFor: "username",
      type: "text",
      value: username,
      valid: false,
      touched: false,
      rules: {
        minLength: 3,
        isAlphanumeric: true,
      },
    },
    {
      label: "Email",
      htmlFor: "email",
      type: "email",
      value: email,
      valid: false,
      touched: false,
      rules: {
        isEmail: true,
      },
    },
    {
      label: "Password",
      htmlFor: "password",
      type: "password",
      value: password,
      valid: false,
      touched: false,
      rules: {
        minLength: 6,
      },
    },
    {
      label: "Password Confirmation",
      htmlFor: "passwordConfirmation",
      type: "password",
      value: passwordConfirmation,
      valid: false,
      touched: false,
      rules: {
        minLength: 6,
      },
    },
  ];
  return ALL_INPUTS;
}
