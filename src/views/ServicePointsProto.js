import { createNamespacedHelpers } from 'vuex';
import log from 'sistemium-debug';
import store from '@/vuex/index';

import { LOAD_SERVICE_POINTS, SEARCH_TEXT_CHANGE } from '@/vuex/serving/actions';
import { CURRENT_SERVING_MASTER, SEARCH_TEXT } from '@/vuex/serving/getters';

import CurrentServingMaster from '@/components/CurrentServingMaster.vue';
import SearchInput from '@/lib/SearchInput.vue';

const {
  mapActions,
  mapGetters,
} = createNamespacedHelpers('serving');

export default function ServicePointsProto(NAME, detailName) {

  const {
    debug,
    error,
  } = log(NAME);

  return {

    methods: {
      settingsClick() {
        const path = `${this.$route.path}/settings`;
        this.$router.push(path)
          .catch(e => this.$error('settingsClick', e));
      },
      servicePointClick(servicePoint) {
        const name = `${this.status === 'paused' ? 'Paused' : ''}${detailName}`;
        this.$router.push({
          name,
          params: { servicePointId: servicePoint.id },
        })
          .catch(e => this.$error('servicePointClick', e));
      },
      backClick() {
        const name = `${this.status === 'paused' ? 'Paused' : ''}${NAME}`;
        this.$router.replace({ name })
          .catch(e => this.$error('backClick', e));
      },
    },

    computed: {
      isRootState() {
        if (this.status === 'paused') {
          return this.$route.name === 'PausedServicePoints';
        }
        return this.$route.name === NAME;
      },
      searchText: {
        ...mapGetters({ get: SEARCH_TEXT }),
        ...mapActions({ set: SEARCH_TEXT_CHANGE }),
      },
      childTitle() {
        return this.$route.meta.title || 'Aptarnavimo taškas';
      },
    },

    async beforeRouteEnter(to, from, next) {

      debug('beforeRouteEnter', to.fullPath, from.fullPath);

      const currentServingMaster = store.getters[`serving/${CURRENT_SERVING_MASTER}`];

      if (!currentServingMaster) {
        next({
          name: 'ChooseServingMaster',
          query: { from: to.fullPath },
        });
        return;
      }

      try {
        await store.dispatch(`serving/${LOAD_SERVICE_POINTS}`, currentServingMaster.id);
        next();
      } catch (e) {
        error('beforeRouteEnter', e);
        await store.dispatch('routingError', {
          to,
          from,
          error: e,
        });
      }
    },

    components: {
      SearchInput,
      CurrentServingMaster,
    },

  };

}
