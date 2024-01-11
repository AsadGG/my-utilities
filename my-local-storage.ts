type Key = '';

function clear() {
  localStorage.clear();
}

function getItem<T>(key: Key): T | null {
  try {
    const stringifiedJson = localStorage.getItem(key);
    if (stringifiedJson) {
      return JSON.parse(stringifiedJson);
    }
    return null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function removeItem(key: Key) {
  localStorage.removeItem(key);
}

function setItem<T>(key: Key, value: T) {
  const stringifiedJson = JSON.stringify(value);
  localStorage.setItem(key, stringifiedJson);
}
