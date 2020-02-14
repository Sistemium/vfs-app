import { requestFromDevice } from 'sistemium-vue/services/native';

const settle = require('axios/lib/core/settle');

export default function (config) {

  /* eslint-disable */
  console.info('Request config', config);

  return new Promise((resolve, reject) => {

    const options = {};
    let { method, headers } = config;

    if (method === 'get') method = 'findAll';
    if (method === 'post') method = 'updateAll';
    if (method === 'delete') method = 'destroy';

    const urlElements = config.url.split('/');
    let id = urlElements.pop().split('?').shift();
    let entity = urlElements.pop();
    if (!id.includes('-')){
      entity = id;
      id = undefined;
    }
    let where = config.url.split('?where:=');
    if (where.length === 1){

      where = undefined

    } else {

      where = where.pop();

    }

    options.pageSize = headers['x-page-size'];

    const iosParams = {
      entity: entity,
      options,
      id,
    };

    if (config.data) {
      iosParams.data = JSON.parse(config.data);
    }

    if (where) {
      iosParams.where = JSON.parse(where);
    }

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
