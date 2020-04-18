const express = require('express');
const path = require('path');
const AAPI = require('./AAPI.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// links together all my front end files
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public/css')));
// app.use(bodyParser.urlencoded({extended: true}));

//Parse URL encoded bodes (as sent by HTML forms)
app.use(express.urlencoded());

// responds with the html file when someone accesses the page
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));
    // res.end();
    res.render('index', {StockDataBack : null});
});

function sendStockDataToWebsite(StockDataBack, res) {
    console.log("retrieved data successfully");
    console.log("Sending out Data", StockDataBack); 
    // console.log(StockDataBack);

    res.render('index', {StockDataBack});
    // res.send(StockDataBack);
    // res.end();
}

app.post('/', (req, res) => {
    console.log('POST /');
    console.log("Incoming request:\t" + req.body);

    StockResponse = {
        "Ticker" : req.body.TickerSymbol,
        "Quantity" : req.body.Quantity,
        "Price" : 0,
    };

    console.log(StockResponse);
    AAPI.GetCurrentStockPrice(StockResponse, sendStockDataToWebsite, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));