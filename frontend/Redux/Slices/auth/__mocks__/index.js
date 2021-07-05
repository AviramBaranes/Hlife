const sendPasswordResetEmailAction = jest.fn();

sendPasswordResetEmailAction
  .mockReturnValueOnce(async () => {
    const error = new Error();
    error.data = "error data";
    error.statue = "error status code";
    throw error;
  })
  .mockReturnValueOnce(async () => {
    return { payload: "success message" };
  });

exports.sendPasswordResetEmailAction = sendPasswordResetEmailAction;
