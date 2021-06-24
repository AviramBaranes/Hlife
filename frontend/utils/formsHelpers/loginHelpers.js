export function createInputListForLogin(email, password) {
  const ALL_INPUTS = [
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
  ];
  return ALL_INPUTS;
}
