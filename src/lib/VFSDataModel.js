import ReactiveModel from 'sistemium-data-vue';
import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import qs from 'qs';
import axios from 'axios';
import noop from 'lodash/noop';

const OFFSET_HEADER = 'x-offset';
const { API_URL } = process.env;

export default class VFSDataModel extends ReactiveModel {

  constructor(config) {
    super(config);
    this.$cachedFetches = {};
    Object.assign(this, config.methods || {});
  }

  cachedFetches(key) {
    return this.$cachedFetches[key] || {};
  }

  setCachedFetch(key, data = {}) {
    this.$cachedFetches[key] = data;
  }

  reactiveGet(id) {
    noop(this.ts);
    return id && super.reactiveGet(id);
  }

  fetchOnce(where) {

    const key = JSON.stringify(where || {});
    const { offset = '*' } = this.cachedFetches(key);

    return this.fetchAll(where, { headers: { [OFFSET_HEADER]: offset } })
      .then(res => {
        this.setCachedFetch(key, { offset: res[OFFSET_HEADER] });
        return res;
      });

  }

  async findByMany(ids, options = {}) {

    const {
      chunkSize = 100,
      field = 'id',
    } = options;

    const chunks = chunk(uniq(ids), chunkSize);

    await Promise.all(chunks.map(chunkIds => {
      const where = { [field]: { $in: chunkIds } };
      return this.findAll(where);
    }));

  }

  async apiDelete(id) {
    return this.destroy(id);
  }

  async apiInsert(data) {
    return this.create(data);
  }

}

export function authorizeAxios(token) {
  VFSDataModel.useAxios(axios.create({
    baseURL: API_URL || '/api',
    headers: {
      'x-page-size': 1000,
      authorization: token,
    },
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    },
  }));
}
