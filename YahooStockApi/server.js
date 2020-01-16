const http = require('http');
const express = require('express');

const HOST = '0.0.0.0';
const PORT = 8080;

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);