import VFSDataModel from '@/lib/VFSDataModel';
import ContactMethod from '@/models-vuex/ContactMethod';

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
    customerContacts({ id: ownerXid }) {
      return this.reactiveFilter({ ownerXid })
        .map(c => {
          const res = {
            ...c,
            contactMethod: ContactMethod.reactiveGet(c.contactMethodId),
          };
          res.href = () => this.href(res);
          return res;
        });
    },
  },
});
