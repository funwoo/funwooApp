//@ts-ignore
const path = require('path');
const {generateApi} = require('swagger-typescript-api');

(async () => {
  await generateApi({
    name: 'funwoo.api.ts',
    output: path.resolve(__dirname, './src/swagger/'),
    url: 'http://localhost:8080/api-json',
    httpClientType: 'axios',
    moduleNameFirstTag: true,
    hooks: undefined,
  });
})();
