import '@testing-library/jest-dom/extend-expect';

window.dataLayer = [];
window.verne = {
  analytics: {
    push: (callback) => {
      const result = callback();
      window.dataLayer.push(result);
    },
  },
};

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});
