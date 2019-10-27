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

  methods: {
    href() {

      const { address, contactMethod } = this;

      if (!address) {
        return null;
      }

      const { link } = contactMethod;

      return `${link}${address}`;

    },
  },

});
