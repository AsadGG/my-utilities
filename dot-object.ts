import { isArray, isPlainObject, reduce, set } from 'lodash';

export function objectToDotNotation(record: Record<string, any>, prefix = '') {
  return reduce(
    record,
    (result, value, key) => {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (isPlainObject(value) || isArray(value)) {
        Object.assign(result, objectToDotNotation(value, newKey));
      } else {
        result[newKey] = value;
      }

      return result;
    },
    {} as Record<string, any>
  );
}

export function dotNotationToObject(record: Record<string, any>) {
  const result = {};

  for (const key in record) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      set(result, key, record[key]);
    }
  }

  return result;
}
