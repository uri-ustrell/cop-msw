import '@testing-library/jest-dom/extend-expect';
import { server } from '../tools/msw/server/index';

window.dataLayer = [];
window.verne = {
  analytics: {
    push: (callback) => {
      const result = callback();
      window.dataLayer.push(result);
    },
  },
};

beforeAll(() => server.listen());

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
