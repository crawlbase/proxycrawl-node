# ProxyCrawl node

Dependency free module for scraping and crawling websites using [ProxyCrawl](https://proxycrawl.com) API

## Installation

Install using npm

```javascript
npm i proxycrawl
```

Require the API class in your project

```javascript
const { ProxyCrawlAPI } = require('proxycrawl');
```

## Usage

Initialize with one of your account tokens, either normal or javascript token. Then make get or post requests accordingly.

```javascript
const api = new ProxyCrawlAPI({ token: 'YOUR_TOKEN' });
```

### GET requests

Pass the url that you want to scrape plus any options from the ones available in the [API documentation](https://proxycrawl.com/dashboard/docs).

```javascript
api.get(url, options);
```

Example:

```javascript
api.get('https://facebook.com/britneyspears').then(response => {
  if (response.statusCode === 200) {
    console.log(response.body);
  }
}).catch(error => console.error);
```

You can pass any options from ProxyCrawl API.

Example:

```javascript
api.get('https://www.reddit.com/r/pics/comments/5bx4bx/thanks_obama/', {
  userAgent: 'Mozilla/5.0 (Windows NT 6.2; rv:20.0) Gecko/20121202 Firefox/30.0',
  format: 'json'
}).then(response => {
  if (response.statusCode === 200) {
    console.log(response.body);
  }
}).catch(error => console.error);
```

### POST requests

Pass the url that you want to scrape, the data that you want to send which can be either a json or a string, plus any options from the ones available in the [API documentation](https://proxycrawl.com/dashboard/docs).

```javascript
api.post(url, data, options);
```

Example:

```javascript
api.post('https://producthunt.com/search', { text: 'example search' }).then(response => {
  if (response.statusCode === 200) {
    console.log(response.body);
  }
}).catch(error => console.error);
```

You can send the data as application/json instead of x-www-form-urlencoded by setting options `postType` as json.

```javascript
api.post('https://httpbin.org/post', { some_json: 'with some value' }, { postType: 'json' }).then(response => {
  if (response.statusCode === 200) {
    console.log(response.body);
  }
}).catch(error => console.error);
```

### Javascript requests

If you need to scrape any website built with Javascript like React, Angular, Vue, etc. You just need to pass your javascript token and use the same calls. Note that only `.get` is available for javascript and not `.post`.

```javascript
const api = new ProxyCrawlAPI({ token: 'YOUR_JAVASCRIPT_TOKEN' });
```

```javascript
api.get('https://www.nfl.com').then(response => {
  if (response.statusCode === 200) {
    console.log(response.body);
  }
}).catch(error => console.error);
```

Same way you can pass javascript additional options.

```javascript
api.get('https://www.freelancer.com', { pageWait: 5000 }).then(response => {
  if (response.statusCode === 200) {
    console.log(response.body);
  }
}).catch(error => console.error);
```

## Original status

You can always get the original status and proxycrawl status from the response. Read the [ProxyCrawl documentation](https://proxycrawl.com/dashboard/docs) to learn more about those status.

```javascript
api.get('https://craiglist.com').then(response => {
  console.log(response.originalStatus, response.pcStatus);
}).catch(error => console.error);
```

If you have questions or need help using the library, please open an issue or [contact us](https://proxycrawl.com/contact).
