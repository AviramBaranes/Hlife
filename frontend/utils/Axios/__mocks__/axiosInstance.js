const put = jest.fn();
const post = jest.fn();

put
  .mockImplementationOnce(async () => {
    const error = new Error();
    error.response = {
      data: "error data",
      status: "error status code",
    };
    throw error;
  })
  .mockImplementationOnce(async () => {
    return { data: "response data" };
  });

post
  .mockImplementationOnce(async (url, payload) => {
    const sendEmailSubmitPayload = { url, payload };
    window.axiosPayloadTests = { sendEmailSubmitPayload };
  })
  .mockImplementationOnce(async (url, payload) => {
    const loginSubmitPayload = { url, payload };
    window.axiosPayloadTests = { loginSubmitPayload };
  })
  .mockImplementationOnce(async (url, payload) => {
    const signUpSubmitPayload = { url, payload };
    window.axiosPayloadTests = { signUpSubmitPayload };
  });

exports.put = put;
exports.post = post;
