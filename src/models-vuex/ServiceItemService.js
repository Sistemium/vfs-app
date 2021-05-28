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
        typeIcon: serviceTypeIcon(props.type),
      };
    },
  },
});

const ICONS_MAP = new Map([
  ['service', 'el-icon-success'],
  ['pause', 'el-icon-video-pause'],
  ['forward', 'el-icon-d-arrow-right'],
  ['other', 'el-icon-info'],
]);

export function serviceTypeIcon(type) {
  return ICONS_MAP.get(type) || ICONS_MAP.get('other');
}
