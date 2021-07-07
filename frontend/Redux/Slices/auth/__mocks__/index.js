const sendPasswordResetEmailAction = jest.fn();

sendPasswordResetEmailAction
  .mockReturnValueOnce(async () => {
    const error = new Error();
    error.data = "error data";
    error.statue = "error status code";
    throw error;
  })
  .mockReturnValueOnce(async () => {
    const email = sendPasswordResetEmailAction.mock.calls[0][0];
    return { payload: `email sent to ${email}` };
  });

const loginUserAction = jest.fn();

loginUserAction
  .mockReturnValueOnce(async () => {
    const error = new Error();
    error.data = "error data";
    error.statue = "error status code";
    throw error;
  })
  .mockReturnValueOnce(async () => {
    const { email } = loginUserAction.mock.calls[0][0];
    return { payload: { message: `your email is ${email}` } };
  });

const signupUserAction = jest.fn();

signupUserAction
  .mockReturnValueOnce(async () => {
    const error = new Error();
    error.data = "error data";
    error.statue = "error status code";
    throw error;
  })
  .mockReturnValueOnce(async () => {
    const { name } = signupUserAction.mock.calls[0][0];
    return { payload: { message: `${name} signed in` } };
  });

const logoutAction = jest.fn();

logoutAction
  .mockReturnValueOnce(async () => {
    console.log(1);
    const error = new Error();
    error.data = "error data";
    error.statue = "error status code";
    throw error;
  })
  .mockReturnValueOnce(async () => {
    console.log(2);
    return { payload: null };
  });

exports.sendPasswordResetEmailAction = sendPasswordResetEmailAction;
exports.loginUserAction = loginUserAction;
exports.signupUserAction = signupUserAction;
exports.logoutAction = logoutAction;
