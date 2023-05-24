import Vue from 'vue';
import '@/config/libs';
import '@/config/element-ui';
import '@/config/maps';
import '@/styles/main.scss';
import routingErrorPlugin from '@/services/routingErrorPlugin';

import App from './App.vue';
import router from './routes';
import store from './vuex/index';
// import './registerServiceWorker';
import { AUTH_INIT } from './vuex/auth/actions';


routingErrorPlugin(store);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    return store.dispatch(`auth/${AUTH_INIT}`);
  },
}).$mount('#app');
