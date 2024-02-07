const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const isoTime = query.iso;

  if (pathname === '/api/parsetime') {
    const date = new Date(isoTime);
    const time = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(time));
  } else if (pathname === '/api/unixtime') {
    const unixTime = { unixtime: Date.parse(isoTime) };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(unixTime));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(process.argv[2]);
