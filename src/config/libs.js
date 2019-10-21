// VUE
import Vue from 'vue';

// MintUI
import MintButton from 'mint-ui/packages/button';
import MintTabBar from 'mint-ui/packages/tabbar';
import MintTabItem from 'mint-ui/packages/tab-item';

import 'mint-ui/lib/style.css';

import ListItem from '@/components/ListItem.vue';
import NavHeader from '@/components/NavHeader.vue';
import ItemsList from '@/components/ItemsList.vue';
import FormField from '@/components/FormField.vue';

import ConfirmButton from '@/lib/ConfirmButton.vue';

Vue.component(MintButton.name, MintButton);
Vue.component(MintTabBar.name, MintTabBar);
Vue.component(MintTabItem.name, MintTabItem);

Vue.component(NavHeader.name, NavHeader);
Vue.component(ItemsList.name, ItemsList);
Vue.component(ListItem.name, ListItem);
Vue.component(FormField.name, FormField);

Vue.component(ConfirmButton.name, ConfirmButton);
