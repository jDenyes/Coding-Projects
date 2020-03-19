const express = require('express');
var path = require('path');
var AAPI = require('./AAPI.js');

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

function sendStockDataToWebsite(stockPrice, res) {
    console.log("retrieved data successfully");
    console.log(stockPrice);

    res.send(stockPrice);
    res.end();
}

app.post('/', (req, res) => {
    console.log('POST /');
    console.log("Incoming request:\t" + req.body);

    StockResponse = {
        "ticker" : req.body.TickerSymbol,
        "quantity" : req.body.quantity,
        "Price" : 0,
    };

    console.log(StockResponse);
    AAPI.GetCurrentStockPrice(StockResponse, sendStockDataToWebsite, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));