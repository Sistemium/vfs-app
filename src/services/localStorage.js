const LS_KEY = 'vfsm';

export function setLocalStorageItem(key, value) {
  return localStorage.setItem(keyName(key), value);
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(keyName(key));
}

function keyName(key) {
  return `${LS_KEY}.${key}`;
}

export function setLocalStorageValue(key, value) {
  return setLocalStorageItem(key, JSON.stringify(value));
}

export function getLocalStorageValue(key, defaultValue) {
  const value = getLocalStorageItem(key);
  try {
    return value === null ? defaultValue : JSON.parse(value);
  } catch (e) {
    return null;
  }
}
