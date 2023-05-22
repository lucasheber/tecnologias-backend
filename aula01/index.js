const http = require('http');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('Hello World');
}).listen(PORT, HOSTNAME, () => {
    console.log(`O servidor está sendo executando em http://${HOSTNAME}:${PORT}`);
});