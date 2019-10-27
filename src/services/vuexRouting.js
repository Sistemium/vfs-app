import log from 'sistemium-telegram/services/log';
import vuex from '@/vuex/store';
import { loadCatalogue } from '@/services/serving';

const { error } = log('vuex:routing');

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
    error('loadServingMasters', e);
    next(e);
  }

}

export async function preLoadCatalogue(to, from, next) {
  loadCatalogue()
    .then(() => next())
    .catch(next);
}
