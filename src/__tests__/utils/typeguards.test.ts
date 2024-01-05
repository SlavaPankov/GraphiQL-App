import { isObject } from '@utils/typeguards/is-object';
import { isStringHashTable } from '@utils/typeguards/is-string-hash-table';
import { describe, expect, it } from 'vitest';

describe('isObject', () => {
  it('isObject returns true properly', () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject({ someProp: 1 })).toBeTruthy();
  });

  it('isObject returns false properly', () => {
    expect(isObject('{ someProp: 1 }')).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
  });
});

describe('isStringHashTable', () => {
  it('isStringHashTable returns true properly', () => {
    expect(isStringHashTable({})).toBeTruthy();
    expect(isStringHashTable({ someProp: '1' })).toBeTruthy();
  });

  it('isStringHashTable returns false properly', () => {
    expect(isStringHashTable({ someProp: 1 })).toBeFalsy();
    expect(isStringHashTable('{ someProp: 1 }')).toBeFalsy();
    expect(isStringHashTable(null)).toBeFalsy();
  });
});
