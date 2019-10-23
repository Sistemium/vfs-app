import Model from '@/lib/Model';

export default new Model({

  name: 'Employee',

  relations: {
    hasMany: {
      // ServiceItem: {
      //   localField: 'serviceItems',
      //   foreignKey: 'servingMasterId',
      // },
    },
  },

  methods: {},

});
