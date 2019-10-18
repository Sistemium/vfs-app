// VUE
import Vue from 'vue';

// MintUI
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

import ListItem from '@/components/ListItem.vue';
import NavHeader from '@/components/NavHeader.vue';
import ItemsList from '@/components/ItemsList.vue';
import FormField from '@/components/FormField.vue';

Vue.use(Mint);

Vue.component(NavHeader.name, NavHeader);
Vue.component(ItemsList.name, ItemsList);
Vue.component(ListItem.name, ListItem);
Vue.component(FormField.name, FormField);
