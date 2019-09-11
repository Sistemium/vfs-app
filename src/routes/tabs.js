import TabsPage from '@/views/TabsPage.vue';
import About from '@/views/About.vue';
import Points from '@/views/Points.vue';
import Tasks from '@/views/Tasks.vue';


const tabs = [
  {
    path: 'points',
    name: 'points',
    component: Points,
    meta: {
      title: 'Taškai',
      img: 'images/icons8-shop.png',
    },
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
  // 'route' is default tab
  redirect: '/tabs/about',
  children: tabs,
  props: { tabs },
};
