//@ts-ignore
const path = require('path');
const {generateApi} = require('swagger-typescript-api');

(async () => {
  await generateApi({
    name: 'funwoo.api.ts',
    output: path.resolve(__dirname, './src/swagger/'),
    url: 'https://funwoo-apis-staging-av33oxrlwq-de.a.run.app/api-json',
    httpClientType: 'axios',
    moduleNameFirstTag: true,
    hooks: undefined,
  });
})();
