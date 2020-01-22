import { Model } from '@vuex-orm/core';
import filter from 'lodash/filter';
import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';

export default class VFSModel extends Model {

  static cachedFetches = {};

  static fetch(where) {
    const url = filter([
      `/${this.entity}`,
      where && `where:=${JSON.stringify(where)}`,
    ]);
    return this.api()
      .get(url.join('?'));
  }

  static fetchOnce(where) {

    const key = JSON.stringify(where || {});

    const cached = this.cachedFetches[key];

    if (cached) {
      return {};
    }

    return this.fetch(where)
      .then(res => {
        if (where) this.cachedFetches[key] = true;
        return res;
      });

  }

  static async findByMany(ids, options = {}) {

    const { chunkSize = 100, field = 'id' } = options;

    const chunks = chunk(uniq(ids), chunkSize);

    await Promise.all(chunks.map(chunkIds => {
      const where = { [field]: { in: chunkIds } };
      return this.fetchOnce(where);
    }));

    return this.query()
      .withAll()
      .where(field, ids)
      .get();

  }

}
