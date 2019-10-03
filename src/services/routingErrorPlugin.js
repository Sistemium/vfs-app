import router from '@/routes/router';

export default function routingErrorPlugin(store) {
  store.watch(() => store.getters.routingError, routingError => {
    if (routingError) {
      router.push({ name: 'RoutingError' })
        .catch(() => {
        });
    }
  });
}
