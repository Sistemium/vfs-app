import TabsPage from '@/views/TabsPage.vue';
import About from '@/views/About.vue';
import ServicePoints from '@/views/ServicePoints.vue';
import Tasks from '@/views/Tasks.vue';
import ServicePoint from '@/views/ServicePoint.vue';
import ServiceItemServiceEdit from '@/components/ServiceItemServiceEdit.vue';

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

  return [
    {
      path: ':servicePointId',
      name: `${parent}ServicePoint`,
      component: ServicePoint,
      children: [
        {
          path: 'edit/:serviceItemServiceId',
          name: `${parent}ServiceItemServiceEdit`,
          component: ServiceItemServiceEdit,
          props: ({ params: { serviceItemServiceId, servicePointId } }) => ({
            serviceItemServiceId,
            from: {
              name: `${parent}ServicePoint`,
              params: { servicePointId },
            },
          }),
        },
        {
          path: 'create/:serviceItemId',
          name: `${parent}ServiceItemServiceCreate`,
          component: ServiceItemServiceEdit,
          props: ({ params: { servicePointId, serviceItemId } }) => ({
            serviceItemId,
            from: {
              name: `${parent}ServicePoint`,
              params: { servicePointId },
            },
          }),
        },
      ],
    },
  ];
}
