import Model from '@/lib/Model';

export default new Model({

  name: 'Employee',

  relations: {
    belongsTo: {
      ServiceItem: {
        localField: 'servingMaster',
        localKey: 'servingMasterId',
      },
    },
  },

  methods: {},

});
