/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { handlers } from '../mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
});
