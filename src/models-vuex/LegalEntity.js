import Contact from '@/models-vuex/Contact';
import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'LegalEntity',
  schema: {
    code: String,
    cts: String,
    id: String,
    name: String,
    ts: String,
    // serviceContracts: this.hasMany('ServiceContract', 'customerLegalEntityId'),
  },
  methods: {
    contacts(legalEntity) {
      return Contact.reactiveFilter({ ownerXid: legalEntity.id });
    },
  },
});
