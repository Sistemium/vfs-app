import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import fpMap from 'lodash/fp/map';
import uniq from 'lodash/uniq';
import fpGet from 'lodash/fp/get';
import get from 'lodash/get';
import find from 'lodash/find';
import log from 'sistemium-debug';
import orderBy from 'lodash/orderBy';
// import keyBy from 'lodash/keyBy';

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
// const siteId = '2b1f36e3-8506-451f-9cfa-d62bf8e0aa49';

export async function loadServicePoints(servingMasterId) {

  await ServiceItem
    .fetchOnce({ servingMasterId });

  const items = ServiceItem.byServingMasterId(servingMasterId);

  // ServicePoint
  const toLoadRelations = filter(items,
    ({ servicePointId }) => !ServicePoint.getByID(servicePointId));

  const servicePointIds = uniq(mapServicePointId(toLoadRelations));

  await ServicePoint.findByMany(servicePointIds);

  const servicePoints = ServicePoint.filter({})
    .filter(({ id }) => servicePointIds.includes(id));

  if (servicePoints.length) {
    await loadServicePointsRelations(servicePoints);
    // ServiceItemService
    await ServiceItemService
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
  loadRelations = filter(servicePoints,
    ({ currentServiceContractId }) => !ServiceContract.getByID(currentServiceContractId));

  const contracts = await ServiceContract
    .findByMany(mapContractId(loadRelations));

  // Person
  loadRelations = filter(contracts, serviceContract => {
    const { customerPersonId } = serviceContract;
    return customerPersonId && !Person.getByID(customerPersonId);
  });

  const persons = await Person
    .findByMany(fpMap('customerPersonId')(loadRelations));
  const contactPersonIds = filter(flatten(fpMap('contactIds')(servicePoints)));
  const contactPersons = await Person
    .findByMany(contactPersonIds);

  // LegalEntity
  loadRelations = filter(contracts, serviceContract => {
    const { customerLegalEntityId } = serviceContract;
    return customerLegalEntityId && !LegalEntity.getByID(customerLegalEntityId);
  });

  const le = await LegalEntity
    .findByMany(fpMap('customerLegalEntityId')(loadRelations));

  // Contact
  await Contact
    .findByMany(mapId(persons), { field: 'ownerXid' });
  await Contact
    .findByMany(mapId(contactPersons), { field: 'ownerXid' });
  await Contact
    .findByMany(mapId(le), { field: 'ownerXid' });

  // Location

  await Location
    .findByMany(fpMap('locationId')(servicePoints));

}

export async function loadCatalogue() {
  await FilterSystemType
    .fetchOnce();
  await FilterSystem
    .fetchOnce();
  await ContactMethod
    .fetchOnce();
}

export function servicePointByIds(ids) {
  // const relations = [
  //   'serviceContract',
  //   'serviceContract.customerPerson',
  //   'serviceContract.customerLegalEntity',
  //   'serviceItems',
  //   'serviceItems.services',
  //   'serviceItems.filterSystem',
  //   'serviceItems.filterSystem.type',
  //   'location',
  // ];
  // return ServicePoint.query()
  //   .with(relations)
  //   .whereIdIn(ids)
  //   .get();
  return ServicePoint.getByMany(ids);
}

export function serviceItemServiceById(id) {
  return ServiceItemService.reactiveGet(id);
  // return ServiceItemService.query()
  //   .withAll()
  //   .find(id);
}

export function serviceItemsByServicePointId(servicePointId) {
  return ServicePoint.serviceItems({ id: servicePointId });
  // return ServiceItem.query()
  //   .with([
  //     '*',
  //     'filterSystem.type',
  //   ])
  //   .where('servicePointId', servicePointId)
  //   .get();
}

export function allServingMasters() {
  debug('allServingMasters');
  const res = Employee.reactiveFilter();
  // const res = Employee.query()
  //   .withAll()
  //   .orderBy('name')
  //   .get();
  debug('allServingMasters', res.length);
  return orderBy(res, 'name');
}

export async function loadServingMasters() {
  await Employee.fetchOnce();
}

export function servingMasterById(id) {
  return Employee.reactiveGet(id);
}

export async function loadServiceItemService(servicePointId) {
  const serviceItems = ServicePoint.serviceItems({ id: servicePointId });
  await ServiceItemService.fetchAll({
    serviceItemId: { $in: mapId(serviceItems) },
  });
}

export function servicesByServicePointId(servicePointId) {
  const serviceItems = ServiceItem.reactiveManyByIndex('servicePointId', servicePointId);
  const ids = mapId(serviceItems);
  const res = ids.map(serviceItemId => ServiceItemService.reactiveManyByIndex('serviceItemId', serviceItemId));
  return flatten(res);
  // return ServiceItemService.reactiveFilter()
  //   .filter(({ serviceItemId }) => ids.contains(serviceItemId));
}

const servicePointSearchRules = [
  fpGet('address'),
  fpGet('districtName'),
  servicePoint => get(ServicePoint.customer(servicePoint), 'name'),
  // fpGet('serviceContract.customer.name'),
];

export function searchServicePoints(servicePoints, text) {

  if (!text) {
    return servicePoints;
  }

  const re = new RegExp(likeLt(escapeRegExp(text)), 'i');
  const phoneText = text.replace(/\D+/g, '')
    .slice(-8);

  const rePhone = new RegExp(likeLt(escapeRegExp(phoneText)), 'i'); // eslint-disable-line
  const contacts = Contact.filter();
  const [{ id: phoneMethodId }] = ContactMethod.filter({ code: 'phone' });
  const filterFn = phoneText.length > 0 ? filterByPhoneFn : anyAddressFn;
  const matchingContacts = filter(contacts, filterFn);
  const matchingContactOwners = matchingContacts.map(contact => contact.ownerXid);
  const matchingContactIds = matchingContacts.map(contact => contact.ownerXid);

  const contactsRule = servicePoint => {
    const person = ServicePoint.customer(servicePoint);
    // fpGet('serviceContract.customer', servicePoint);
    const { contactIds } = servicePoint;
    return (person && matchingContactOwners.includes(person.id))
      || (contactIds && contactIds.some(c => matchingContactIds.includes(c)));
  };

  return filter(servicePoints, servicePointMatcher);

  function servicePointMatcher(servicePoint) {
    return find(servicePointSearchRules, searcher => re.test(searcher(servicePoint)))
      || contactsRule(servicePoint);
  }

  function filterByPhoneFn(contact) {
    return contact.contactMethodId === phoneMethodId && rePhone.test(contact.address);
  }

  function anyAddressFn(contact) {
    return re.test(contact.address);
  }

}

export function servicePointsTasks(servicePoints, dateB, dateE) {

  return filter(servicePoints, servicePoint => {
    const serviceItems = ServicePoint.serviceItems(servicePoint);
    return find(serviceItems, item => ServiceItem.needServiceBetween(item, dateB, dateE)
      || ServiceItem.serviceBetween(item, dateB, dateE));
  });

}

export function pausedServicePoints(servicePoints) {

  return filter(servicePoints, servicePoint => {
    const serviceItems = ServicePoint.serviceItems(servicePoint);
    return find(serviceItems, 'pausedFrom');
  });

}

export function servingServicePoints(servicePoints) {

  return filter(servicePoints, servicePoint => {
    const serviceItems = ServicePoint.serviceItems(servicePoint);
    return find(serviceItems, ({ pausedFrom }) => !pausedFrom);
  });

}
