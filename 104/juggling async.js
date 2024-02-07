const http = require('http');

const urls = process.argv.slice(2);
const results = new Array(urls.length).fill(null);

urls.forEach((url, index) => {
  http.get(url, (response) => {
    let data = '';
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      results[index] = data;
      const allResultsReceived = results.every((result) => result !== null);
      if (allResultsReceived) {
        results.forEach((result) => console.log(result));
      }
    });
    response.on('error', (error) => {
      console.error(error);
    });
  });
});
