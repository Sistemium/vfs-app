import VueManagedModel from 'sistemium-vue/jsdata/Model';
import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

async function findByMany(ids, options) {

  const { chunkSize = 100, field = 'id' } = options || {};

  const chunks = chunk(uniq(ids), chunkSize);

  return Promise.all(chunks.map(chunkIds => {
    const where = { [field]: { in: chunkIds } };
    return this.findAll({ where }, { ...options });
  }))
    .then(flatten);

}

VueManagedModel.prototype.findByMany = findByMany;

export default VueManagedModel;
