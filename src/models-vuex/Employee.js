import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'Employee',
  schema: {
    info: String,
    name: String,
    personId: String,
    siteId: String,
    accountId: String,
  },
});
