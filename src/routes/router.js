import Vue from 'vue';
import Router from 'vue-router';
import multiGuard from 'vue-router-multiguard';
import RoutingError from '@/views/RoutingError.vue';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';
import ChooseServingMaster from '@/views/ChooseServingMaster.vue';

import * as vr from '@/services/vuexRouting';

import tabs from '@/routes/tabs';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth',
      alias: '/login',
      name: 'Auth',
      component: Auth,
    },
    {
      path: '/error',
      name: 'RoutingError',
      component: RoutingError,
    },
    {
      path: '/servingMaster',
      name: ChooseServingMaster.name,
      component: ChooseServingMaster,
      beforeEnter: multiGuard([vr.authGuard, vr.loadServingMasters]),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
    {
      ...tabs,
      beforeEnter: multiGuard([vr.authGuard, vr.loadServingMasters, vr.preLoadCatalogue]),
    },
  ],
});
