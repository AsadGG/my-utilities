import { Injectable } from '@angular/core';

type Key = 'USER';

function addKeyPrefix(key: string) {
  const prefix = 'APP';
  return `${prefix}_${key}`;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    this.initialize();
  }

  initialize() {
    Object.keys(localStorage)
      .filter((key) => key.includes(`_EXPIRY_TIMESTAMP_IN_MILLISECOND`))
      .forEach((expiryKey) => {
        const stringifiedValue = localStorage.getItem(expiryKey);
        let expiryInMillisecond = 0;
        if (stringifiedValue) {
          expiryInMillisecond = JSON.parse(stringifiedValue);
        }
        const key = expiryKey.replace('_EXPIRY_TIMESTAMP_IN_MILLISECOND', '');
        const expiryTimeout = Math.max(expiryInMillisecond - Date.now(), 0);
        setTimeout(() => {
          localStorage.removeItem(expiryKey);
          localStorage.removeItem(key);
        }, expiryTimeout);
      });
  }

  clear() {
    localStorage.clear();
  }

  getItem<T>(key: Key): T | null {
    const newKey = addKeyPrefix(key);
    try {
      const stringifiedValue = localStorage.getItem(newKey);
      if (stringifiedValue) {
        return JSON.parse(stringifiedValue);
      }
      return null;
    } catch {
      localStorage.removeItem(newKey);
      return null;
    }
  }

  removeItem(key: Key) {
    const newKey = addKeyPrefix(key);
    localStorage.removeItem(newKey);
  }

  setItem<T>(key: Key, value: T, expiryInMillisecond?: number) {
    const newKey = addKeyPrefix(key);
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(newKey, stringifiedValue);

    if (expiryInMillisecond) {
      const expiryKeyKey = `${newKey}_EXPIRY_TIMESTAMP_IN_MILLISECOND`;
      const expiryTimestamp = Date.now() + expiryInMillisecond;
      const stringifiedTimestamp = JSON.stringify(expiryTimestamp);
      localStorage.setItem(expiryKeyKey, stringifiedTimestamp);
    }
  }
}
