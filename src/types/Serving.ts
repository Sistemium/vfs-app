import type { ApiModel } from '@/types/Api';

export interface ServiceItem extends ApiModel {
  filterSystemId: string;
  info?: string;
  servicePrice?: number;
  smallServicePrice?: number;
  serviceFrequency?: number;
  serviceInfo?: string;
  additionalServiceInfo?: string;
}

export type SERVICE_TYPE_PAUSE = 'pause';
export type SERVICE_TYPE_FORWARD = 'forward';
export type SERVICE_TYPE_SERVICE = 'service';
export type SERVICE_TYPE_OTHER = 'other';

export type SERVICE_TYPE = SERVICE_TYPE_SERVICE
  | SERVICE_TYPE_FORWARD | SERVICE_TYPE_PAUSE | SERVICE_TYPE_OTHER;

export interface ServiceItemService extends ApiModel {
  serviceItemId: string;
  servingMasterId: string;
  date: string;
  info?: string;
  nextServiceInfo?: string;
  serviceType?: '0' | '1';
  type: SERVICE_TYPE;
}

