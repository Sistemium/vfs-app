// import { v4 } from 'uuid';
import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'ServiceItemService',
  schema: {
    date: String,
    // id: this.uid(() => v4()),
    info: String,
    nextServiceInfo: String,
    serviceItemId: String,
    serviceType: String,
    servingMasterId: String,
    type: String,
    // serviceItem: this.belongsTo('ServiceItem', 'serviceItemId'),
  },
  methods: {
    typeIcon(serviceItemService) {
      const { type } = serviceItemService;
      return serviceTypeIcon(type);
    },
    fullData(props) {
      return props && {
        ...props,
        typeIcon: () => this.typeIcon(props),
      };
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
