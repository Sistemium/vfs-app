import Vue from 'vue';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/lt';
import locale from 'element-ui/lib/locale';
// import '@/styles/element-ui.scss';
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/reset.css';

locale.use(lang);
Vue.use(ElementUI);
