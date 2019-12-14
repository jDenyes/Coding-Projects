const https     = require('https');
const request   = require('request');

// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
//   let data = '';

//     // A chunk of data has been recieved.
//     resp.on('data', (chunk) => {
//         data += chunk;
//       });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//         console.log(JSON.parse(data).explanation);
//     });

// }).on("error", (err) => {
//     console.log("Error: " + err.message);
// });

const options = {
    hostname    : 'https://www.alphavantage.co',
    port        : null,
    path        : '/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo',
    method      : 'GET'
};

const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo";

const req = https.request(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 13];

    res.on('end', () => {

        var JsonObject = JSON.parse(data);

        var Date = '';
        var year = '2019';
        for(var month = 1; month < 13; month++) {
            for(var day = 1; day < daysInMonth[month - 1] + 1; day++) {
                
                var dayString = day.toString();
                var monthString = month.toString();

                if(day < 10) {
                    dayString = '0' + dayString;
                }

                if(month < 10) {
                    monthString = '0' + monthString;
                } 

                Date = year + '-' + monthString + '-' + dayString;

                var result = JsonObject['Time Series (Daily)'][Date];
                if(result != undefined) {
                    console.log(Date);
                    console.log(JsonObject['Time Series (Daily)'][Date]);
                }
            }
        }

        //console.log(JsonObject['Time Series (Daily)']);

        // console.log(JsonObject['Time Series (Daily']);


        // var JsonObject = JSON.parse(data);
        // console.log(JsonObject['Time Series (Daily)']['2019-12-13']); 
    });

    req.on('error', (e) => {
        console.error(e);
    });
});

req.end();
