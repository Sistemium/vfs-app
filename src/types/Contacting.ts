import { ApiModel } from '@/types/Api';

export interface ContactMethodData extends ApiModel {
  code: string;
  link: string;
  mask: string;
  name: string;
  validationPattern: string;
}

export interface ContactData extends ApiModel {
  address: string;
  contactMethodId: string;
  info?: string;
  ownerXid: string;
  source: string;
  contactMethod: ContactMethodData;
  href?(): string,
}
