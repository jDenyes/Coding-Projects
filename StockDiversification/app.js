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

function callback(data, res) {
    console.log("retrieved data successfully");
    console.log(data);

    res.send(data);
    res.end();
}

app.post('/', (req, res) => {
    console.log('POST /');
    console.log("Incoming request:\t" + req.body);
    ticker = req.body.TickerSymbol; 
    quantity = req.body.Quantity;

    console.log(quantity + " " + ticker);
    let url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".concat(ticker.concat('&outputsize=full&apikey=7KZAUZJR7I5MDRU0'));
    AAPI.GetCurrentStockPrice(url, callback, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));