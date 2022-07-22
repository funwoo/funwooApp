import {isNotEmptyString, isSet} from './formatChecker';

export const isRequiredString = (value: string) =>
  isSet(value) && isNotEmptyString(value) ? undefined : '此欄位為必填。';
