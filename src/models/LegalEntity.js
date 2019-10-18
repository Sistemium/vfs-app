import Model from '@/lib/Model';

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

  methods: {},

});
