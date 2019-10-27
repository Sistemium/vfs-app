import Model from '@/lib/Model';

export default new Model({

  name: 'Contact',

  relations: {
    belongsTo: {
      ContactMethod: {
        localField: 'contactMethod',
        localKey: 'contactMethodId',
      },
    },
  },

  methods: {},

});
