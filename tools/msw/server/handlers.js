// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const handlers = [
  rest.get('/urlToMatch', (req, res, ctx) => null),
];

export default handlers;
