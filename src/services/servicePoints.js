import ServiceContract from '@/models/ServiceContract';
import ServicePoint from '@/models/ServicePoint';
import ServiceItem from '@/models/ServiceItem';
import Employee from '@/models/Employee';
import LegalEntity from '@/models/LegalEntity';
import Person from '@/models/Person';
import ServiceItemService from '@/models/ServiceItemService';

import FilterSystemType from '@/models/FilterSystemType';
import FilterSystem from '@/models/FilterSystem';

import filter from 'lodash/filter';
import fpMap from 'lodash/fp/map';
import uniq from 'lodash/uniq';

const mapServicePointId = fpMap('servicePointId');
const mapContractId = fpMap('currentServiceContractId');
const mapId = fpMap('id');

export async function loadServicePoints(servingMasterId) {

  const items = await ServiceItem.findAll({
    servingMasterId,
    limit: 1000,
  });

  let toLoadRelations = filter(items, ({ servicePoint }) => !servicePoint);
  await ServicePoint.findByMany(mapServicePointId(toLoadRelations));

  const res = ServicePoint.getMany(uniq(mapServicePointId(items)));

  toLoadRelations = filter(res, ({ currentServiceContract }) => !currentServiceContract);
  await ServiceContract.findByMany(mapContractId(toLoadRelations));

  toLoadRelations = filter(ServiceContract.getAll(), serviceContract => {
    const { customerPersonId, customerPerson } = serviceContract;
    return customerPersonId && !customerPerson;
  });

  await Person.findByMany(fpMap('customerPersonId')(toLoadRelations));

  toLoadRelations = filter(ServiceContract.getAll(), serviceContract => {
    const { customerLegalEntityId, customerLegalEntity } = serviceContract;
    return customerLegalEntityId && !customerLegalEntity;
  });

  await LegalEntity.findByMany(fpMap('customerLegalEntityId')(toLoadRelations));

  return res;

}

export async function loadCatalogue() {
  await FilterSystemType.findAll();
  await FilterSystem.findAll();
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

export function servingMasterById(id) {
  return id ? Employee.get(id) : null;
}

export function loadServiceItemService(servicePointId) {
  const serviceItems = ServiceItem.filter({ servicePointId });
  const where = { serviceItemId: { '==': mapId(serviceItems) } };
  return ServiceItemService.findAll({ where });
}
