import TabsPage from '@/views/TabsPage.vue';
import About from '@/views/About.vue';
import ServicePoints from '@/views/ServicePoints.vue';
import Tasks from '@/views/Tasks.vue';
import ServicePoint from '@/views/ServicePoint.vue';

import vuex from '@/vuex/store';
// import log from 'sistemium-telegram/services/log';

// const { debug } = log('router:tabs');

const tabs = [
  {
    path: 'servicePoints',
    name: 'ServicePoints',
    component: ServicePoints,
    meta: {
      title: 'Taškai',
      img: 'images/icons8-shop.png',
    },
    children: [
      {
        path: ':servicePointId',
        name: 'ServicePoint',
        component: ServicePoint,
      },
    ],
  },
  {
    path: 'tasks',
    name: 'tasks',
    component: Tasks,
    meta: {
      title: 'Užduotys',
      img: 'images/icons8-to_do.png',
    },
  },
  {
    path: 'about',
    name: 'about',
    component: About,
    meta: {
      title: 'Apie',
      img: 'images/icons8-home.png',
    },
  },
];

export default {

  path: '/tabs',
  name: 'tabs',
  component: TabsPage,
  redirect: '/tabs/servicePoints',
  children: tabs,
  props: { tabs },

  beforeEnter(to, from, next) {
    const authorized = vuex.getters['auth/IS_AUTHORIZED'];
    // debug(to.fullPath, 'from', from.fullPath, authorized);
    // debug('q', to.query, from.query);
    if (!authorized) {
      next({
        path: '/auth',
        query: {
          ...from.query,
          from: to.fullPath,
        },
      });
      return;
    }
    next();
  },

};
