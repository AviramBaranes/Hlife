const put = jest.fn();

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

exports.put = put;
