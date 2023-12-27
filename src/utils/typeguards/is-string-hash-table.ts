import { isObject } from './is-object';

export const isStringHashTable = (
  arg: unknown
): arg is Record<string, string> =>
  isObject(arg) &&
  Object.values(arg).every((value) => typeof value === 'string');
