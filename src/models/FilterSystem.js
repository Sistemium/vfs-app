import Model from '@/lib/Model';

export default new Model({

  name: 'FilterSystem',

  relations: {
    belongsTo: {
      FilterSystemType: {
        localField: 'type',
        localKey: 'filterSystemTypeId',
      },
    },
  },

  methods: {},

});
