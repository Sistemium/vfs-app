import Model from '@/lib/Model';

export default new Model({

  name: 'FilterSystemType',

  relations: {
    hasMany: {
      FilterSystem: {
        localField: 'systems',
        foreignKey: 'filterSystemTypeId',
      },
    },
  },

  methods: {},

});
