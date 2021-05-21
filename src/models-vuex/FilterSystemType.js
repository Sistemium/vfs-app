import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'FilterSystemType',
  schema: {
    code: String,
    cts: String,
    guaranteePeriod: String,
    id: String,
    name: String,
    serviceFrequency: String,
    ts: String,
    // systems: this.hasMany('FilterSystem', 'filterSystemTypeId'),
  },
});
