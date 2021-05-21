import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'ContactMethod',
  schema: {
    code: String,
    link: String,
    mask: String,
    name: String,
    ts: String,
    validationPattern: String,
  },
});
