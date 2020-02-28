const express = require('express');
var path = require('path');
const app = express();
const port = 3000;

// links together all my front end files
app.use(express.static(path.join(__dirname, '/')));

//Parse URL encoded bodes (as sent by HTML forms)
app.use(express.urlencoded());

// responds with the html file when someone accesses the page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    res.end();
});

app.post('/', (req, res) => {
    console.log('POST /');
    console.log(req.body);
    // res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));