import each from 'lodash/each';
import replace from 'lodash/replace';

const LT_LETTERS = {

  a: 'ą',
  s: 'š',
  e: 'ėę',
  i: 'į',
  u: 'ūų',
  c: 'č',
  z: 'ž',

};

// eslint-disable-next-line import/prefer-default-export
export function likeLt(string) {

  let res = string;

  each(LT_LETTERS, (to, from) => {
    const braced = `[${to}${from}]`;
    res = replace(res, new RegExp(braced, 'ig'), braced);
  });

  return res;
}
