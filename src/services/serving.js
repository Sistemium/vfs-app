/* eslint-disable */
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

  await ServiceItem.api().fetchOnce({
    servingMasterId: { '==': servingMasterId },
  });

  const items = ServiceItem.query()
    .withAll()
    .where('servingMasterId', servingMasterId)
    .limit(1000)
    .get();

  // ServicePoint
  const toLoadRelations = filter(items, ({ servicePoint }) => !servicePoint);

  const servicePointIds = uniq(mapServicePointId(toLoadRelations));

  await ServicePoint.api().findByMany(servicePointIds);

  const servicePoints = filter(ServicePoint.query().withAll().whereIdIn(servicePointIds).get(), { siteId });

  if (servicePoints.length) {
    await loadServicePointsRelations(servicePoints);
    // ServiceItemService
    await ServiceItemService.api().findByMany(mapId(items), { field: 'serviceItemId' });
  }

  return ServicePoint.query()
    .withAll()
    .where('id', uniq(mapServicePointId(items)))
    .where('siteId', siteId)
    .get();

}

async function loadServicePointsRelations(servicePoints) {

  let loadRelations;

  // ServiceContract
  loadRelations = filter(servicePoints, ({ currentServiceContract }) => !currentServiceContract);
  const contracts = await ServiceContract.api().findByMany(mapContractId(loadRelations));

  // Person
  loadRelations = filter(contracts, serviceContract => {
    const { customerPersonId, customerPerson } = serviceContract;
    return customerPersonId && !customerPerson;
  });

  const persons = await Person.api().findByMany(fpMap('customerPersonId')(loadRelations));
  const contactPersonIds = filter(flatten(fpMap('contactIds')(servicePoints)));
  const contactPersons = await Person.api().findByMany(contactPersonIds);

  // LegalEntity
  loadRelations = filter(contracts, serviceContract => {
    const { customerLegalEntityId, customerLegalEntity } = serviceContract;
    return customerLegalEntityId && !customerLegalEntity;
  });

  const le = await LegalEntity.api().findByMany(fpMap('customerLegalEntityId')(loadRelations));

  // Contact
  await Contact.api().findByMany(mapId(persons), { field: 'ownerXid' });
  await Contact.api().findByMany(mapId(contactPersons), { field: 'ownerXid' });
  await Contact.api().findByMany(mapId(le), { field: 'ownerXid' });

  // Location

  await Location.api().findByMany(fpMap('locationId')(servicePoints));

}

export async function loadCatalogue() {
  await FilterSystemType.api().fetchOnce();
  await FilterSystem.api().fetchOnce();
  await ContactMethod.api().fetchOnce();
}

export function servicePointByIds(ids) {
  let relations = [
    'serviceContract',
    'serviceContract.customerPerson',
    'serviceContract.customerLegalEntity',
    'serviceItems',
    'location',
  ];
  return ServicePoint.query().with(relations).whereIdIn(ids).get();
}

export function servingMastersByIds(ids) {
  return Employee.query().withAll().whereIdIn(ids).get();
}

export async function loadServingMasters() {
  await Employee.api().fetchOnce();
  return Employee.all();
}

export function servingMasterById(id) {
  return id ? Employee.find(id) : null;
}

export async function loadServiceItemService(servicePointId) {
  // await ServiceItem.api().fetchOnce();
  const serviceItems = ServiceItem.query().withAll().where('servicePointId', servicePointId).get();
  await ServiceItemService.api().fetchOnce({
    serviceItemId: { '==': mapId(serviceItems) },
  });
  return ServiceItemService.query().withAll().where('serviceItemId', mapId(serviceItems)).get();
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
