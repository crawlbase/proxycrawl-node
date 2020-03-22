// These are not proper unit tests, they are just to see some examples and play around.

const { CrawlingAPI } = require('./index.js');
const { test } = require('./src/config.js');

if (test.normalToken === '' || test.javascriptToken === '') {
  console.error('Please add a test normal token and javascript token in src/config.js to run tests');
  process.exit(1);
}

function processTestResponse(response) {
  if (response.statusCode === 200) {
    console.log(response.body);
    console.log('Test passed');
  } else {
    console.error('Test failed, expected statusCode 200 got ' + response.statusCode);
    process.exit(1);
  }
}

function processTestError(error) {
  console.error('Test failed: ' + error);
  process.exit(1);
}

const normalAPI = new CrawlingAPI({ token: test.normalToken });

normalAPI.get('http://httpbin.org/anything?hello=world').then(processTestResponse).catch(processTestError);

normalAPI.post('http://httpbin.org/post', { hello: 'post' }).then(processTestResponse).catch(processTestError);

normalAPI.post('http://httpbin.org/post', { hello: 'json' }, { postType: 'json' }).then(processTestResponse).catch(processTestError);

normalAPI.put('http://httpbin.org/put', { hello: 'put' }).then(processTestResponse).catch(processTestError);

const javascriptAPI = new CrawlingAPI({ token: test.javascriptToken });

javascriptAPI.get('http://httpbin.org/anything?hello=world').then(processTestResponse).catch(processTestError);
