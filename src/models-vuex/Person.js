import Contact from '@/models-vuex/Contact';
import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'Person',
  schema: {
    avatarPictureId: String,
    code: String,
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    // serviceContracts: this.hasMany('ServiceContract', 'customerPersonId'),
  },
  methods: {
    contacts(person) {
      return Contact.customerContacts(person);
    },
    name(person) {
      const {
        firstName,
        lastName,
      } = person;
      return `${firstName} ${lastName}`;
    },
  },
});
