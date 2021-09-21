const defaultCookies = { _csrf: "_csrf", jon: "jon", XSRF_TOKEN: "token" };

exports.parseCookies = jest
  .fn()
  .mockImplementationOnce(() => defaultCookies)
  .mockImplementationOnce(() => defaultCookies)
  .mockImplementationOnce(() => defaultCookies)
  .mockImplementationOnce(() => defaultCookies)
  .mockImplementationOnce(() => defaultCookies)
  .mockImplementation(() => ({
    ...defaultCookies,
    choseWorkout: "true",
  }));
