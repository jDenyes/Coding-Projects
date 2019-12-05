var http = require('https');
var fs = require('fs');
const readline = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
});

readline.question(`What stock would you like to look at`, (ticker) => {
    setStockTicker(ticker);
    readline.close();
});

function setStockTicker(ticker) {
    StockOptions = {
        "method"    : "GET",
        "hostname"  : "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "port"      : null,
        "path"      : `/market/get-quotes?region=US&lang=en&symbols=${ticker}%252CKC%253DF%252C002210.KS%252CIWM%252CAMECX`,
            "headers"   : {
            "x-rapidapi-host"   : "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key"    : "e3610d308fmsh36fdf4e1360a8cap17fd9bjsncef8ef3108e9"
    }
}

var req = http.request(StockOptions, (res) => {
    var chunks = [];

    res.on('data', (chunk) => {
        chunks.push(chunk);
    });

    res.on('end', () => {
        var body = Buffer.concat(chunks);
        var JsonObject = JSON.parse(body);
        console.log(JsonObject.quoteResponse.result[0].regularMarketPrice);
    });
})

req.end();

// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp)=> {
//     let data = '';

//     resp.on('data', (chunk) => {
//         data += chunk;
//     });

//     resp.on('end', () => {
//         console.log(JSON.parse(data).explanation);
//     });
// }).on('error', (err) => {
//     console.log("Error: " + err.message);
// });

