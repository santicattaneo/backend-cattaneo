const http = require('http');

const server  = http.createServer((req, res) => {
    res.end('hola desde el backend');
});

server.listen(8080, () => {
    console.log('listening on port 8080')
});