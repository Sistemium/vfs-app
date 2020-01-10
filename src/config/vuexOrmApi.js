// import VuexORM from '@vuex-orm/core';
import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';

const cachedFetches = {};

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

      const key = `${this.model.name}:${JSON.stringify(where || {})}`;

      const cached = cachedFetches[key];

      if (cached) {
        return {};
      }

      return this.model.api()
        .fetch(where)
        .then(res => {
          cachedFetches[key] = true;
          return res;
        });

    },

    async findByMany(ids, options = {}) {

      const { chunkSize = 100, field = 'id' } = options;

      const chunks = chunk(uniq(ids), chunkSize);

      await Promise.all(chunks.map(chunkIds => {
        const where = { [field]: { in: chunkIds } };
        return this.fetchOnce(where);
      }));

      return this.model.query()
        .withAll()
        .where(field, ids)
        .get();

    },
  },
};
