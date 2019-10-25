import { createNamespacedHelpers } from 'vuex';
import store from '@/vuex/index';

import { LOAD_SERVICE_POINTS, SEARCH_TEXT_CHANGE } from '@/vuex/serving/actions';
import { CURRENT_SERVING_MASTER, SEARCH_TEXT } from '@/vuex/serving/getters';

import log from 'sistemium-telegram/services/log';
import CurrentServingMaster from '@/components/CurrentServingMaster.vue';
import SearchInput from '@/lib/SearchInput.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('serving');

export default function (NAME, detailName) {

  const { debug, error } = log(NAME);

  return {

    methods: {
      servicePointClick(servicePoint) {
        this.$router.push({
          name: detailName,
          params: { servicePointId: servicePoint.id },
        });
      },
      backClick() {
        this.$router.push({ name: NAME });
      },
    },

    computed: {
      isRootState() {
        return this.$route.name === NAME;
      },
      searchText: {
        ...mapGetters({ get: SEARCH_TEXT }),
        ...mapActions({ set: SEARCH_TEXT_CHANGE }),
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
