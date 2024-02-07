const http = require('http');

const url = process.argv[2];

http.get(url, (response) => {
  let data = '';
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
    data += chunk;
  });
  response.on('end', () => {
    console.log(data.length);
    console.log(data);
  });
  response.on('error', (error) => {
    console.error(error);
  });
});
