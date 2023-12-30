import { describe, expect, it } from 'vitest';
import { parseIntrospection } from '@utils/parseIntrospection';
import mockSDLResponse from '../mocks/mockSDLResponse.json';

describe('parseIntrospection', () => {
  it('parseIntrospection returns schema on valid rawResponse', async () => {
    const promise = parseIntrospection(mockSDLResponse);
    const expected = mockSDLResponse.data;
    await expect(promise).resolves.toEqual(expected);
  });

  it('parseIntrospection throw on invalid rawResponse', async () => {
    const promise = parseIntrospection('invalid response');
    await expect(promise).rejects.toThrow();
  });
});
