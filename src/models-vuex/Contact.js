import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'Contact',
  schema: {
    address: String,
    contactMethodId: String,
    info: String,
    ownerXid: String,
    source: String,
    // contactMethod: this.belongsTo('ContactMethod', 'contactMethodId'),
  },
  methods: {
    href(contact) {
      const {
        address,
        contactMethod,
      } = contact;
      if (!address) {
        return null;
      }
      const { link } = contactMethod;
      return `${link}${address}`;
    },
  },
});
