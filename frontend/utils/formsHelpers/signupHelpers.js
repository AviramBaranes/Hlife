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
      // rules: {
      //   minLength: 3,
      // },
    },
    {
      label: "Username",
      htmlFor: "username",
      type: "text",
      value: username,
    },
    {
      label: "Email",
      htmlFor: "email",
      type: "email",
      value: email,
    },
    {
      label: "Password",
      htmlFor: "password",
      type: "password",
      value: password,
    },
    {
      label: "Password Confirmation",
      htmlFor: "passwordConfirmation",
      type: "password",
      value: passwordConfirmation,
    },
  ];
  return ALL_INPUTS;
}
