import fpMap from 'lodash/fp/map';
import fpOrderBy from 'lodash/fp/orderBy';

export const mapId = fpMap('id');
export const orderByName = fpOrderBy(['name'], ['ASC']);
export const orderByAddress = fpOrderBy(['address'], ['ASC']);
