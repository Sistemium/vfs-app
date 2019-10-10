import ServicePoint from '@/models/ServicePoint';
import ServiceItem from '@/models/ServiceItem';
import Employee from '@/models/Employee';
import filter from 'lodash/filter';
import fpMap from 'lodash/fp/map';
import uniq from 'lodash/uniq';

const mapServicePointId = fpMap('servicePointId');

export async function loadServicePoints(servingMasterId) {
  const items = await ServiceItem.findAll({
    servingMasterId,
    limit: 1000,
  });
  const toLoadRelations = filter(items, ({ servicePoint }) => !servicePoint);
  await ServicePoint.findByMany(mapServicePointId(toLoadRelations));
  return ServicePoint.getMany(uniq(mapServicePointId(items)));
}

export function servicePointByIds(ids) {
  return ServicePoint.getMany(ids);
}

export function servingMastersByIds(ids) {
  return Employee.getMany(ids);
}

export async function loadServingMasters() {
  return Employee.findAll();
}
