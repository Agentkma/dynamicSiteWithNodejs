// create a web server
'use strict';
const http = require('http');
const port = process.env.PORT || 3000;
const router = require('./router.js');

const server =http.createServer((request,response)=>{
    router.home(request, response);
    router.user(request, response);
});

server.listen(port, ()=>{
    console.log('Server running on port:', port);
});
