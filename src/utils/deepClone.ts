export const deepClone = <Any>(any: Any): Any =>
  JSON.parse(JSON.stringify(any));
