import type { ApiModel } from '@/types/Api';

export type SERVICE_TYPE_PAUSE = 'pause';
export type SERVICE_TYPE_FORWARD = 'forward';
export type SERVICE_TYPE_SERVICE = 'service';
export type SERVICE_TYPE_OTHER = 'other';

export type SERVICE_TYPE = SERVICE_TYPE_SERVICE
  | SERVICE_TYPE_FORWARD | SERVICE_TYPE_PAUSE | SERVICE_TYPE_OTHER;


export interface ServiceItemData extends ApiModel {
  filterSystemId: string;
  info?: string;
  servicePrice?: number;
  smallServicePrice?: number;
  serviceFrequency?: number;
  serviceInfo?: string;
  additionalServiceInfo?: string;
  servingMasterId: string;

  currentServiceContractId: string;
  guaranteePeriod?: number;
  installingDate?: string;
  installingMasterId?: string;
  installingPrice: number;
  // lastServiceDate: string;
  // lastServiceType: '0' | '1';
  // nextServiceDate: string;
  // pausedFrom: string;
  plannedServiceDate: string;
  plannedServiceType: string;
  servicePointId: string;

}

export interface ServiceItemService extends ApiModel {
  serviceItemId: string;
  servingMasterId: string;
  date: string;
  info?: string;
  nextServiceInfo?: string;
  serviceType?: '0' | '1';
  type: SERVICE_TYPE;
}

export interface ServicePointData extends ApiModel {
  address: string;
  addressInfo?: string;
  sortAddress: string;
  apartment?: string;
  contactIds: string[];
  currentServiceContractId: string;
  districtName?: string;
  doorCode?: string;
  gifts?: string;
  house?: string;
  info?: string;
  isPaused: boolean;
  isReady: boolean;
  localityId?: string;
  locationId?: string;
  name: string;
  // phone: string;
  // servingMasterId: string;
  siteId: string;
  streetId?: string;
  type?: string;
}

export interface ServiceContractData extends ApiModel {
  customerLegalEntityId?: string;
  customerPersonId?: string;
  date: string;
  num?: string;
  paymentMethod: 'bank' | 'cash';
  siteId: string;
}
