import log from 'sistemium-debug';
import router from './router';

export default router;

const { debug } = log('routes');

router.onError(err => {
  debug('onError', Object.keys(err));
});
