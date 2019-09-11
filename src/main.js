import Vue from 'vue';
import '@/config/libs';
import '@/config/element-ui';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/styles/main.scss';
import { AUTH_INIT } from './vuex/auth/actions';

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    return store.dispatch(`auth/${AUTH_INIT}`);
  },
}).$mount('#app');
