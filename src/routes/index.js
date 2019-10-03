import log from 'sistemium-telegram/services/log';
import router from './router';

export default router;

const { debug } = log('routes');

router.onError(err => {
  debug('onError', Object.keys(err));
});
