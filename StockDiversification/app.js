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

// app.get('/TickerResponse', (req,res) => {
//     res.sendFile((path.join(__dirname + '/index.html'));
// });

function callback(data) {
    console.log("retrieved data successfully");
    // console.log(data);
    // res.send(data);
}

app.post('/', (req, res) => {
    console.log('POST /');
    console.log(req.body);
    ticker = req.body.TickerSymbol; 
    console.log(ticker);
    let url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".concat(ticker.concat('&outputsize=full&apikey=7KZAUZJR7I5MDRU0'));
    // url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo";
    // res.end();
    AAPI.GetCurrentStockPrice(url, callback);

    // res.sendFile(path.join(__dirname + '/index.html'));
    // res.end();
});

// app.get('/posted', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'));
//     res.end();
// });

app.listen(port, () => console.log(`Example app listening on port ${port}`));