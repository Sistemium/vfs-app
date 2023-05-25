import VFSDataModel from '@/lib/VFSDataModel';
import ContactMethod from '@/models-vuex/ContactMethod';
import type { ContactMethodData, ContactData } from '@/types/Contacting';

interface ContactModel extends VFSDataModel {
  href(contact: ContactData): string;

  customerContacts(a: { id: string }): ContactData[];
}

export default new VFSDataModel({
  collection: 'Contact',
  schema: {
    contactMethodId: String,
  },
  methods: {
    href(contact) {
      const { address, contactMethod } = contact;
      if (!address) {
        return null;
      }
      const { link } = contactMethod;
      return `${link}${address}`;
    },
    customerContacts({ id: ownerXid }) {
      return (this.reactiveFilter({ ownerXid }) as ContactData[]).map((c: ContactData) => {
        const res: ContactData = {
          ...c,
          contactMethod: ContactMethod.reactiveGet(c.contactMethodId) as ContactMethodData,
        };
        res.href = () => this.href(res);
        return res;
      });
    },
  } as ContactModel,
}) as ContactModel;
