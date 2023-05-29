const http = require('http')
const url = require('url');
const fs = require('fs');
const path = require('path');

const port = 3003;
const hostname = 'localhost';

const mimeTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpg',
    woff: 'font/woof'
};

http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    const pwd = process.cwd();

    const fullPath = path.join(pwd, decodeURI(uri));

    let pathLink = null;

    try {
        pathLink = fs.lstatSync(fullPath);

        if (pathLink.isFile()) {
            ext = path.extname(fullPath).substring(1);
            let mimeType = mimeTypes[ext];

            let readStream = fs.createReadStream(fullPath);

            res.writeHead(200, { 'Content-type': mimeType });
            readStream.pipe(res)
        } else if (pathLink.isDirectory()) {
            res.writeHead(302, { 'Location': `http://${hostname}:${port}${uri}/index.html` });
            res.end();
        } else {
            res.writeHead(500, { 'Content-type': 'text/plain' });
            res.write('Oops... um erro inesperado aconteceu :/');
            res.end();
        }
    } catch (error) {
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.write('Oops... o endereço passado não existe ou foi removido :/');
        res.end();
    }
    
}).listen(port, hostname, () => {
    console.log(`O servidor está sendo executando em http://${hostname}:${port}`);
});