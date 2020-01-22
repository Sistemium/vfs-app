import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import fpMap from 'lodash/fp/map';
import uniq from 'lodash/uniq';
import fpGet from 'lodash/fp/get';
import find from 'lodash/find';
import log from 'sistemium-telegram/services/log';

import { likeLt } from '@/lib/lt';
import Location from '@/models-vuex/Location';
import ServiceContract from '@/models-vuex/ServiceContract';
import ServicePoint from '@/models-vuex/ServicePoint';
import ServiceItem from '@/models-vuex/ServiceItem';
import LegalEntity from '@/models-vuex/LegalEntity';
import Person from '@/models-vuex/Person';
import ServiceItemService from '@/models-vuex/ServiceItemService';

import Contact from '@/models-vuex/Contact';

import FilterSystemType from '@/models-vuex/FilterSystemType';
import ContactMethod from '@/models-vuex/ContactMethod';
import Employee from '@/models-vuex/Employee';
import FilterSystem from '@/models-vuex/FilterSystem';

const { debug } = log('serving');

debug('init');

const mapServicePointId = fpMap('servicePointId');
const mapContractId = fpMap('currentServiceContractId');
const mapId = fpMap('id');

// TODO: read from user's roles
const siteId = '2b1f36e3-8506-451f-9cfa-d62bf8e0aa49';

export async function loadServicePoints(servingMasterId) {

  await ServiceItem.api()
    .fetchOnce({
      servingMasterId: { '==': servingMasterId },
    });

  const items = ServiceItem.byServingMasterId(servingMasterId);

  // ServicePoint
  const toLoadRelations = filter(items, ({ servicePoint }) => !servicePoint);

  const servicePointIds = uniq(mapServicePointId(toLoadRelations));

  await ServicePoint.findByMany(servicePointIds);

  const servicePoints = ServicePoint.query()
    .withAll()
    .whereIdIn(servicePointIds)
    .where('siteId', siteId)
    .get();

  if (servicePoints.length) {
    await loadServicePointsRelations(servicePoints);
    // ServiceItemService
    await ServiceItemService.api()
      .findByMany(mapId(items), { field: 'serviceItemId' });
  }

}

export function servicePointsByServingMasterId(servingMasterId) {
  const items = ServiceItem.byServingMasterId(servingMasterId);
  return servicePointByIds(mapServicePointId(items));
}

async function loadServicePointsRelations(servicePoints) {

  let loadRelations;

  // ServiceContract
  loadRelations = filter(servicePoints, ({ currentServiceContract }) => !currentServiceContract);
  const contracts = await ServiceContract.api()
    .findByMany(mapContractId(loadRelations));

  // Person
  loadRelations = filter(contracts, serviceContract => {
    const { customerPersonId, customerPerson } = serviceContract;
    return customerPersonId && !customerPerson;
  });

  const persons = await Person.api()
    .findByMany(fpMap('customerPersonId')(loadRelations));
  const contactPersonIds = filter(flatten(fpMap('contactIds')(servicePoints)));
  const contactPersons = await Person.api()
    .findByMany(contactPersonIds);

  // LegalEntity
  loadRelations = filter(contracts, serviceContract => {
    const { customerLegalEntityId, customerLegalEntity } = serviceContract;
    return customerLegalEntityId && !customerLegalEntity;
  });

  const le = await LegalEntity.api()
    .findByMany(fpMap('customerLegalEntityId')(loadRelations));

  // Contact
  await Contact.api()
    .findByMany(mapId(persons), { field: 'ownerXid' });
  await Contact.api()
    .findByMany(mapId(contactPersons), { field: 'ownerXid' });
  await Contact.api()
    .findByMany(mapId(le), { field: 'ownerXid' });

  // Location

  await Location.api()
    .findByMany(fpMap('locationId')(servicePoints));

}

export async function loadCatalogue() {
  await FilterSystemType.api()
    .fetchOnce();
  await FilterSystem.api()
    .fetchOnce();
  await ContactMethod.api()
    .fetchOnce();
}

export function servicePointByIds(ids) {
  const relations = [
    'serviceContract',
    'serviceContract.customerPerson',
    'serviceContract.customerLegalEntity',
    'serviceItems',
    'serviceItems.services',
    'serviceItems.filterSystem',
    'serviceItems.filterSystem.type',
    'location',
  ];
  return ServicePoint.query()
    .with(relations)
    .whereIdIn(ids)
    .get();
}

export function serviceItemServiceById(id) {
  return ServiceItemService.query()
    .withAll()
    .find(id);
}

export function serviceItemsByServicePointId(servicePointId) {
  return ServiceItem.query()
    .with([
      '*',
      'filterSystem.type',
    ])
    .where('servicePointId', servicePointId)
    .get();
}

export function allServingMasters() {
  debug('allServingMasters');
  const res = Employee.query()
    .withAll()
    .orderBy('name')
    .get();
  debug('allServingMasters', res.length);
  return res;
}

export async function loadServingMasters() {
  await Employee.fetchOnce();
}

export function servingMasterById(id) {
  return id ? Employee.find(id) : null;
}

export async function loadServiceItemService(servicePointId) {
  const serviceItems = ServiceItem.query()
    .where('servicePointId', servicePointId)
    .get();
  await ServiceItemService.fetchOnce({
    serviceItemId: { '==': mapId(serviceItems) },
  });
}

export function servicesByServicePointId(servicePointId) {
  const serviceItems = ServiceItem.query()
    .where('servicePointId', servicePointId)
    .get();
  return ServiceItemService.query()
    .withAll()
    .where('serviceItemId', mapId(serviceItems))
    .get();
}

const servicePointSearchRules = [
  fpGet('address'),
  fpGet('districtName'),
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
