const { VUE_APP_LS_PREFIX = 'stv' } = process.env;

export function setLocalStorageItem(key, value) {
  return localStorage.setItem(keyName(key), value);
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(keyName(key));
}

function keyName(key) {
  return `${VUE_APP_LS_PREFIX}.${key}`;
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
