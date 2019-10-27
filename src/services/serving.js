import ServiceContract from '@/models/ServiceContract';
import ServicePoint from '@/models/ServicePoint';
import ServiceItem from '@/models/ServiceItem';
import Employee from '@/models/Employee';
import LegalEntity from '@/models/LegalEntity';
import Person from '@/models/Person';
import ServiceItemService from '@/models/ServiceItemService';

import FilterSystemType from '@/models/FilterSystemType';
import FilterSystem from '@/models/FilterSystem';
import ContactMethod from '@/models/ContactMethod';
import Contact from '@/models/Contact';

import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import fpMap from 'lodash/fp/map';
import uniq from 'lodash/uniq';
import fpGet from 'lodash/fp/get';
import find from 'lodash/find';

import { likeLt } from '@/lib/lt';

const mapServicePointId = fpMap('servicePointId');
const mapContractId = fpMap('currentServiceContractId');
const mapId = fpMap('id');

export async function loadServicePoints(servingMasterId) {

  const items = await ServiceItem.findAll({
    servingMasterId,
    limit: 1000,
  });

  // ServicePoint
  let toLoadRelations = filter(items, ({ servicePoint }) => !servicePoint);
  await ServicePoint.findByMany(mapServicePointId(toLoadRelations));

  const res = ServicePoint.getMany(uniq(mapServicePointId(items)));

  // ServiceContract
  toLoadRelations = filter(res, ({ currentServiceContract }) => !currentServiceContract);
  const contracts = await ServiceContract.findByMany(mapContractId(toLoadRelations));

  // Person
  toLoadRelations = filter(contracts, serviceContract => {
    const { customerPersonId, customerPerson } = serviceContract;
    return customerPersonId && !customerPerson;
  });

  const persons = await Person.findByMany(fpMap('customerPersonId')(toLoadRelations));

  // LegalEntity
  toLoadRelations = filter(contracts, serviceContract => {
    const { customerLegalEntityId, customerLegalEntity } = serviceContract;
    return customerLegalEntityId && !customerLegalEntity;
  });

  await LegalEntity.findByMany(fpMap('customerLegalEntityId')(toLoadRelations));

  await Contact.findByMany(mapId(persons), { field: 'ownerXid' });

  // ServiceItemService
  await ServiceItemService.findByMany(mapId(items), { field: 'serviceItemId' });

  return res;

}

export async function loadCatalogue() {
  await FilterSystemType.findAll();
  await FilterSystem.findAll();
  await ContactMethod.findAll();
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

const servicePointSearchRules = [
  fpGet('address'),
  fpGet('serviceContract.customer.name'),
];

export function searchServicePoints(servicePoints, text) {

  if (!text) {
    return servicePoints;
  }

  const re = new RegExp(likeLt(escapeRegExp(text)), 'i');

  return filter(servicePoints, servicePointMatcher);

  function servicePointMatcher(servicePoint) {
    return find(servicePointSearchRules, searcher => re.test(searcher(servicePoint)));
  }

}

export function servicePointsTasks(servicePoints, dateB, dateE) {

  return filter(servicePoints, servicePoint => {
    const { serviceItems } = servicePoint;
    return find(serviceItems, serviceItem => serviceItem.needServiceBetween(dateB, dateE)
      || serviceItem.serviceBetween(dateB, dateE));
  });

}
