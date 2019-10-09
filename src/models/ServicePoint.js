import Model from '@/lib/Model';

export default new Model({

  name: 'ServicePoint',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    hasMany: {
      ServiceItem: {
        localField: 'serviceItems',
        foreignKey: 'servicePointId',
      },
    },
  },

  methods: {},

});
