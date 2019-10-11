import vuex from '@/vuex/store';

export function authGuard(to, from, next) {

  const authorized = vuex.getters['auth/IS_AUTHORIZED'];

  if (authorized) {
    next();
    return;
  }

  next({
    path: '/auth',
    query: {
      ...from.query,
      from: to.fullPath,
    },
  });

}

export async function loadServingMasters(to, from, next) {

  try {
    await vuex.dispatch('serving/LOAD_SERVING_MASTERS');
    next();
  } catch (e) {
    next(e);
  }

}
