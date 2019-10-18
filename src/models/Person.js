import Model from '@/lib/Model';
import { Record } from 'js-data';

class PersonRecord extends Record {
}

Object.defineProperties(PersonRecord.prototype, {
  name: {
    type: 'string',
    get() {
      const { firstName, lastName } = this;
      return `${firstName} ${lastName}`;
    },
  },
});


export default new Model({

  name: 'Person',
  recordClass: PersonRecord,

  relations: {
    hasMany: {
      ServiceContract: {
        localField: 'serviceContracts',
        foreignKey: 'customerPersonId',
      },
    },
  },

  methods: {},

});
