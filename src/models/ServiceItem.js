import Model from '@/lib/Model';

export default new Model({

  name: 'ServiceItem',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    belongsTo: {
      ServicePoint: {
        localField: 'servicePoint',
        localKey: 'servicePointId',
      },
    },
  },

  methods: {},

});
