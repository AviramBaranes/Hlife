exports.push = jest.fn((url) => {
  window.location.routerPushedValue = url;
});
