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
