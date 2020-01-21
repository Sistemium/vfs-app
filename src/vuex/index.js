import log from 'sistemium-telegram/services/log';
import store from '@/vuex/store';

const { debug } = log('vuex');

export default store;

store.subscribeAction({

  before(action) {
    const { type } = action;
    if (type.match(/entities/)) {
      return;
    }
    debug(`before action ${type}`);
  },

  after(action) {
    const { type } = action;
    if (type.match(/entities/)) {
      return;
    }
    debug(`after action ${type}`);
  },

});
