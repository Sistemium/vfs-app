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

  const items = await ServiceItem.findAll({
    servingMasterId,
    limit: 1000,
  });

  // ServicePoint
  const toLoadRelations = filter(items, ({ servicePoint }) => !servicePoint);

  const servicePointIds = uniq(mapServicePointId(toLoadRelations));
  await ServicePoint.findByMany(servicePointIds);

  const servicePoints = filter(ServicePoint.getMany(servicePointIds), { siteId });

  if (servicePoints.length) {
    await loadServicePointsRelations(servicePoints);
    // ServiceItemService
    await ServiceItemService.findByMany(mapId(items), { field: 'serviceItemId' });
  }

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

async function loadServicePointsRelations(servicePoints) {

  let loadRelations;

  // ServiceContract
  loadRelations = filter(servicePoints, ({ currentServiceContract }) => !currentServiceContract);
  const contracts = await ServiceContract.findByMany(mapContractId(loadRelations));

  // Person
  loadRelations = filter(contracts, serviceContract => {
    const { customerPersonId, customerPerson } = serviceContract;
    return customerPersonId && !customerPerson;
  });

  const persons = await Person.findByMany(fpMap('customerPersonId')(loadRelations));
  const contactPersonIds = filter(flatten(fpMap('contactIds')(servicePoints)));
  const contactPersons = await Person.findByMany(contactPersonIds);

  // LegalEntity
  loadRelations = filter(contracts, serviceContract => {
    const { customerLegalEntityId, customerLegalEntity } = serviceContract;
    return customerLegalEntityId && !customerLegalEntity;
  });

  const le = await LegalEntity.findByMany(fpMap('customerLegalEntityId')(loadRelations));

  // Contact
  await Contact.findByMany(mapId(persons), { field: 'ownerXid' });
  await Contact.findByMany(mapId(contactPersons), { field: 'ownerXid' });
  await Contact.findByMany(mapId(le), { field: 'ownerXid' });

  // Location

  await Location.findByMany(fpMap('locationId')(servicePoints));

}

export async function loadCatalogue() {
  await FilterSystemType.api().fetch();
  await FilterSystem.api().fetch();
  await ContactMethod.api().fetch();
}

export function servicePointByIds(ids) {
  return ServicePoint.getMany(ids);
}

export function servingMastersByIds(ids) {
  return Employee.findIn(ids);
}

export async function loadServingMasters() {
  await Employee.api().fetchOnce();
  return Employee.all();
}

export function servingMasterById(id) {
  return id ? Employee.find(id): null;
}

export function loadServiceItemService(servicePointId) {
  const serviceItems = ServiceItem.filter({ servicePointId });
  const where = { serviceItemId: { '==': mapId(serviceItems) } };
  return ServiceItemService.findAll({ where });
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
