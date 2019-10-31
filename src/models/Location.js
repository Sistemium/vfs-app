import Model from '@/lib/Model';

export default new Model({

  name: 'Location',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    hasMany: {
      ServicePoint: {
        localField: 'servicePoints',
        foreignKey: 'servicePointId',
      },
    },
  },

});
