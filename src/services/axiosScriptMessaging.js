import { requestFromDevice } from 'sistemium-vue/services/native';

const settle = require('axios/lib/core/settle');

export default function (config) {

  /* eslint-disable */
  console.info('Request config', config);

  return new Promise((resolve, reject) => {

    const options = {};
    let { method, headers } = config;

    if (method === 'get') method = 'findAll';

    const entity = config.url.split('/').pop().split('?').shift();

    let where = config.url.split('/').pop().split('?where:=').pop();

    if (where !== entity) {

      where = JSON.parse(where)

    } else {

      where = undefined;

    }

    options.pageSize = headers['x-page-size'];

    const iosParams = {
      entity: entity,
      options,
    };

    iosParams.where = where;

    requestFromDevice(method, iosParams)
      .then(res => {

        const response = {
          data: JSON.stringify((method === 'update' || method === 'find') ? res[0] : res),
          status: 200,
          statusText: 'OK',
          config,
        };

        settle(resolve, reject, response);

      })
      .catch(err => {

        console.error('error:', err);

        reject(err);

      });

  });
}
