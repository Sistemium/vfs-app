import Model from '@/lib/Model';

export default new Model({

  name: 'ServiceItemService',

  // recordClass: ServiceItemServiceRecord,

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  properties: {
    date: String,
    info: String,
    type: String,
    nextServiceInfo: String,
    serviceType: String,
    nextServiceDate: String,

    serviceItemId: String,
    servingMasterId: String,
  },

  relations: {
    belongsTo: {
      ServiceItem: {
        localField: 'serviceItem',
        localKey: 'serviceItemId',
      },
      // Employee: {
      //   localField: 'servingMaster',
      //   localKey: 'servingMasterId',
      // },
    },
  },

  methods: {
    typeIcon() {
      const { type } = this;
      return serviceTypeIcon(type);
    },
  },

});

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
