import store from '@/vuex/store';
import log from 'sistemium-telegram/services/log';

const { debug } = log('vuex');

export default store;

store.subscribeAction({

  before(action) {
    debug(`before action ${action.type}`);
  },

  after(action) {
    debug(`after action ${action.type}`);
  },

});
