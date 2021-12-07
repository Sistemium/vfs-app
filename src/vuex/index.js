import log from 'sistemium-debug';
import store from '@/vuex/store';
import { authorizeAxios } from '@/lib/VFSDataModel';

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

const unsubscribe = store.subscribe(mutation => {
  debug('mutation', mutation.type);
  if (mutation.type === 'auth/SET_AUTHORIZED') {
    unsubscribe();
    authorizeAxios(mutation.payload.token);
  }
}, { prepend: true });
