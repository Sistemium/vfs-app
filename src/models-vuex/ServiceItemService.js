import { Model } from '@vuex-orm/core';

// eslint-disable-next-line import/no-cycle
import ServiceItem from './ServiceItem';

export default class ServiceItemService extends Model {
  static entity = 'ServiceItemService';

  static fields() {
    return {
      cts: this.attr(null),
      date: this.attr(null),
      id: this.attr(null),
      info: this.attr(null),
      nextServiceInfo: this.attr(null),
      serviceItemId: this.attr(null),
      serviceType: this.attr(null),
      servingMasterId: this.attr(null),
      ts: this.attr(null),
      type: this.attr(null),
      serviceItem: this.belongsTo(ServiceItem, 'serviceItemId'),
    };
  }

  typeIcon() {
    const { type } = this;
    return serviceTypeIcon(type);
  }
}

export function serviceTypeIcon(type) {
  switch (type) {
    case 'service':
      return 'el-icon-success';
    case 'pause':
      return 'el-icon-video-pause';
    case 'forward':
      return 'el-icon-d-arrow-right';
    default:
      return 'el-icon-info';
  }
}
