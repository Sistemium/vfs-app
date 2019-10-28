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
import flatten from 'lodash/flatten';
import fpMap from 'lodash/fp/map';
import uniq from 'lodash/uniq';
import fpGet from 'lodash/fp/get';
import find from 'lodash/find';

import { likeLt } from '@/lib/lt';
import log from 'sistemium-telegram/services/log';

const { debug } = log('serving');

debug('init');

const mapServicePointId = fpMap('servicePointId');
const mapContractId = fpMap('currentServiceContractId');
const mapId = fpMap('id');

// TODO: read from user's roles
const siteId = '2b1f36e3-8506-451f-9cfa-d62bf8e0aa49';

export async function loadServicePoints(servingMasterId) {

  const items = await ServiceItem.findAll({
    servingMasterId,
    limit: 1000,
  });

  // ServicePoint
  let toLoadRelations = filter(items, ({ servicePoint }) => !servicePoint);

  const servicePointIds = uniq(mapServicePointId(toLoadRelations));
  await ServicePoint.findByMany(servicePointIds);

  const servicePoints = filter(ServicePoint.getMany(servicePointIds), { siteId });

  // ServiceContract
  toLoadRelations = filter(servicePoints, ({ currentServiceContract }) => !currentServiceContract);
  const contracts = await ServiceContract.findByMany(mapContractId(toLoadRelations));

  // Person
  toLoadRelations = filter(contracts, serviceContract => {
    const { customerPersonId, customerPerson } = serviceContract;
    return customerPersonId && !customerPerson;
  });

  const persons = await Person.findByMany(fpMap('customerPersonId')(toLoadRelations));
  const contactPersonIds = filter(flatten(fpMap('contactIds')(servicePoints)));
  const contactPersons = await Person.findByMany(contactPersonIds);

  // LegalEntity
  toLoadRelations = filter(contracts, serviceContract => {
    const { customerLegalEntityId, customerLegalEntity } = serviceContract;
    return customerLegalEntityId && !customerLegalEntity;
  });

  const le = await LegalEntity.findByMany(fpMap('customerLegalEntityId')(toLoadRelations));

  // Contact
  await Contact.findByMany(mapId(persons), { field: 'ownerXid' });
  await Contact.findByMany(mapId(contactPersons), { field: 'ownerXid' });
  await Contact.findByMany(mapId(le), { field: 'ownerXid' });

  // ServiceItemService
  await ServiceItemService.findByMany(mapId(items), { field: 'serviceItemId' });

  const where = {
    id: {
      in: uniq(mapServicePointId(items)),
    },
    siteId: {
      '==': siteId,
    },
  };
  return ServicePoint.filter({ where });

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
