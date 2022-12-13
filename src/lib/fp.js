import fpMap from 'lodash/fp/map';
// import fpOrderBy from 'lodash/fp/orderBy';
import { createNewSortInstance } from 'fast-sort';

export const sort = createNewSortInstance({
  comparer: new Intl.Collator('lt', {
    numeric: false,
    sensitivity: 'base',
  }).compare,
});

export const mapId = fpMap('id');
// export const orderByName = fpOrderBy(['name'], ['ASC']);
// export const orderByAddress = fpOrderBy(['sortAddress', 'address'], ['ASC', 'ASC']);

export function orderByAddress(items) {
  return sort(items)
    .asc([
      ({ sortAddress }) => sortAddress,
      ({ address }) => address,
    ]);
}
