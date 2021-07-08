exports.push = jest.fn((url) => {
  window.location.routerPushedValue = url;
});

exports.useRouter = jest.fn(() => ({
  replace(url) {
    window.location.routerReplacedValue = url;
  },
}));
