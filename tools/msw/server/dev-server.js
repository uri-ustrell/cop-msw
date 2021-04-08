/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { setupWorker } from 'msw';
import handlers from './handlers';

const server = setupWorker(...handlers);

server.start();

export { server };
