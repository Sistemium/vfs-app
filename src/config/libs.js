// VUE
import Vue from 'vue';

// MintUI
import MintButton from 'mint-ui/lib/button';
import MintTabBar from 'mint-ui/lib/tabbar';
import MintTabItem from 'mint-ui/lib/tab-item';
import Radio from 'mint-ui/lib/radio';
import Switch from 'mint-ui/lib/switch';
import Cell from 'mint-ui/lib/cell';

import 'mint-ui/lib/style.css';

import ListItem from '@/components/ListItem.vue';
import NavHeader from '@/components/NavHeader.vue';
import ItemsList from '@/components/ItemsList.vue';
import FormField from '@/components/FormField.vue';

import ConfirmButton from '@/lib/ConfirmButton.vue';

import './sistemium';

Vue.component(MintButton.name, MintButton);
Vue.component(MintTabBar.name, MintTabBar);
Vue.component(MintTabItem.name, MintTabItem);
Vue.component(Radio.name, Radio);
Vue.component(Switch.name, Switch);
Vue.component(Cell.name, Cell);

Vue.component(NavHeader.name, NavHeader);
Vue.component(ItemsList.name, ItemsList);
Vue.component(ListItem.name, ListItem);
Vue.component(FormField.name, FormField);

Vue.component(ConfirmButton.name, ConfirmButton);
