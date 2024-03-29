import TabsPage from '@/views/TabsPage.vue';
import About from '@/views/About.vue';
import ServicePoints from '@/views/ServicePoints.vue';
import Tasks from '@/views/Tasks.vue';
import ServicePoint from '@/views/ServicePoint.vue';
import ServiceItemEdit from '@/components/ServiceItemEdit.vue';
import ServiceItemServiceEdit from '@/components/ServiceItemServiceEdit.vue';
import ServicePointMap from '@/views/ServicePointMap.vue';
import ViewSettingsPage from '@/views/ViewSettingsPage.vue';

// import log from 'sistemium-debug';

// const { debug } = log('router:tabs');

const tabs = [
  {
    path: 'servicePoints',
    name: 'ServicePoints',
    component: ServicePoints,
    props: {
      status: 'serving',
      // rootState: 'ServicePoints',
    },
    meta: {
      title: 'Taškai',
      img: 'images/icons8-shop.png',
    },
    children: servicePointChildren(''),
  },
  {
    path: 'tasks',
    name: 'Tasks',
    component: Tasks,
    children: servicePointChildren('Task'),
    meta: {
      title: 'Užduotys',
      img: 'images/icons8-to_do.png',
    },
  },
  {
    path: 'paused',
    name: 'PausedServicePoints',
    component: ServicePoints,
    children: servicePointChildren('Paused'),
    props: {
      status: 'paused',
      // rootState: 'PausedServicePoints',
    },
    meta: {
      title: 'Archyvas',
      img: 'images/icons8-pause-squared.png',
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

};

function servicePointChildren(parent) {

  const from = servicePointId => ({
    name: `${parent}ServicePoint`,
    params: { servicePointId },
  });

  return [
    {
      path: 'settings',
      name: `${parent}ViewSettings`,
      component: ViewSettingsPage,
      meta: {
        title: 'Nustatymai',
      },
    },
    {
      path: ':servicePointId',
      name: `${parent}ServicePoint`,
      component: ServicePoint,
      children: [
        {
          path: 'map',
          name: `${parent}Map`,
          component: ServicePointMap,
          props({ params: { servicePointId } }) {
            return {
              servicePointId,
              from: from(servicePointId),
            };
          },
        },
        {
          path: 'itemEdit/:serviceItemId',
          name: `${parent}ServiceItemEdit`,
          component: ServiceItemEdit,
          props: ({ params: { serviceItemId, servicePointId } }) => ({
            serviceItemId,
            from: from(servicePointId),
          }),
        },
        {
          path: 'serviceEdit/:serviceItemServiceId',
          name: `${parent}ServiceItemServiceEdit`,
          component: ServiceItemServiceEdit,
          props: ({ params: { serviceItemServiceId, servicePointId } }) => ({
            serviceItemServiceId,
            from: from(servicePointId),
          }),
        },
        {
          path: 'serviceCreate/:serviceItemId',
          name: `${parent}ServiceItemServiceCreate`,
          component: ServiceItemServiceEdit,
          props: ({ params: { servicePointId, serviceItemId } }) => ({
            serviceItemId,
            from: from(servicePointId),
          }),
        },
      ],
    },
  ];
}
