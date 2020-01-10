// import VuexORM from '@vuex-orm/core';
import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';

export default {
  actions: {

    fetch(where) {
      const url = filter([
        `/${this.model.entity}`,
        where && `where:=${JSON.stringify(where)}`,
      ]);
      return this.get(url.join('?'));
    },

    fetchOnce(where) {

      // TODO: check if data exists
      const data = this.model.query()
        .first();
      if (data) {
        return {};
      }
      return this.model.api()
        .fetch(where);
    },

    async findByMany(ids, options = {}) {

      const { chunkSize = 100, field = 'id' } = options;

      const chunks = chunk(uniq(ids), chunkSize);

      await Promise.all(chunks.map(chunkIds => {
        const where = { [field]: { in: chunkIds } };
        return this.fetch(where);
      }));

      return this.model.query()
        .withAll()
        .where(field, ids)
        .get();

    },
  },
};
