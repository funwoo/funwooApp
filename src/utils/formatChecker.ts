export const isSet = <Whatever>(
  whatever: Whatever | null | undefined,
): whatever is Whatever =>
  whatever !== null &&
  whatever !== undefined &&
  typeof whatever !== 'undefined' &&
  whatever !== void 0;

export const isNotSet = <Whatever>(
  whatever: Whatever | null | undefined,
): whatever is null | undefined =>
  whatever === null ||
  whatever === undefined ||
  typeof whatever === 'undefined' ||
  whatever === void 0;

export const isString = <Whatever>(
  whatever: Whatever | string,
): whatever is string => typeof whatever === 'string';

export const isEmptyString = (string: string) => string.length === 0;

export const isNotEmptyString = (string: string) => string.length !== 0;

export const isEmptyArray = (array: Array<any>) => array.length === 0;

export const isNotEmptyArray = (array: Array<any>) => array.length !== 0;

export const isEmptyObject = (object: Record<any, any>) =>
  Object.keys(object).length === 0;

export const isBoolean = (whatever: any): whatever is boolean =>
  typeof whatever === 'boolean';

export const isTrue = (whatever: any): whatever is true =>
  isBoolean(whatever) && whatever === true;

export const isNotTrue = <ExceptTrue>(
  whatever: ExceptTrue | true,
): whatever is ExceptTrue => whatever !== true;

export const isObject = <Object extends Record<string, any>>(
  whatever: Object | any,
): whatever is Object => {
  return (
    typeof whatever === 'object' && isSet(whatever) && !Array.isArray(whatever)
  );
};
