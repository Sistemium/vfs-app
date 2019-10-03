import Vue from 'vue';
import '@/config/libs';
import '@/config/element-ui';

import App from './App.vue';
import router from './routes';
import store from './vuex/index';
import './registerServiceWorker';
import '@/styles/main.scss';
import { AUTH_INIT } from './vuex/auth/actions';

import routingErrorPlugin from '@/services/routingErrorPlugin';

routingErrorPlugin(store);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    return store.dispatch(`auth/${AUTH_INIT}`);
  },
}).$mount('#app');
