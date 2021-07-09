const getCsrfToken = jest.fn();

getCsrfToken
  .mockReturnValueOnce(async () => {
    return { type: "action", payload: null };
  })
  .mockReturnValueOnce(async () => {
    return { type: "action", payload: null };
  });
exports.getCsrfToken = getCsrfToken;
