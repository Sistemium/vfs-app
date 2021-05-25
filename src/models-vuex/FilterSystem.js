import VFSDataModel from '@/lib/VFSDataModel';
import FilterSystemType from '@/models-vuex/FilterSystemType';

export default new VFSDataModel({
  collection: 'FilterSystem',
  schema: {
    brandId: String,
    filterSystemTypeId: String,
    guaranteePeriod: String,
    name: String,
    serviceFrequency: Number,
    servicePrice: Number,
    smallServicePrice: Number,
    // type: this.belongsTo('FilterSystemType', 'filterSystemTypeId'),
  },
  methods: {
    type(filterSystem) {
      return filterSystem && FilterSystemType.reactiveGet(filterSystem.filterSystemTypeId);
    },
  },
});
