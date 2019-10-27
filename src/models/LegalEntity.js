import Model from '@/lib/Model';
import Contact from '@/models/Contact';

export default new Model({

  name: 'LegalEntity',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    hasMany: {
      ServiceContract: {
        localField: 'serviceContracts',
        foreignKey: 'customerLegalEntityId',
      },
    },
  },

  methods: {
    contacts() {
      return Contact.filter({ ownerXid: this.id });
    },
  },

});
