import { describe, expect, it } from 'vitest';
import { parseSchema } from '@utils/gqlSchemaService';
import mockSDLResponse from '../mocks/mockSDLResponse.json';

describe('gqlSchemaService', () => {
  const rawResponse = JSON.stringify(mockSDLResponse);
  it('parseSchema returns schema on valid rawResponse', async () => {
    const promise = parseSchema(rawResponse);
    const expected = mockSDLResponse.data.__schema;
    await expect(promise).resolves.toEqual(expected);
  });

  it('parseSchema throw on invalid rawResponse', async () => {
    const promise = parseSchema('invalid response');
    await expect(promise).rejects.toThrow();
  });
});
