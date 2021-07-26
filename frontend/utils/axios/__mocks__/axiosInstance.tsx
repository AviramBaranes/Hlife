const put = jest.fn();
const post = jest.fn();

put
  .mockImplementationOnce(async () => {
    const error = new Error() as any;
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
    (window as any).axiosPayloadTests = { sendEmailSubmitPayload };
  })
  .mockImplementationOnce(async (url, payload) => {
    const loginSubmitPayload = { url, payload };
    (window as any).axiosPayloadTests = { loginSubmitPayload };
  })
  .mockImplementationOnce(async (url, payload) => {
    const signUpSubmitPayload = { url, payload };
    (window as any).axiosPayloadTests = { signUpSubmitPayload };
  });

export default { put, post };
