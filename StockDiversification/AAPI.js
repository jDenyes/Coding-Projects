const https = require('https');

// const options = {
//     hostname    : 'https://www.alphavantage.co',
//     port        : null,
//     path        : '/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo',
//     method      : 'GET'
// };

// const url = 
// var temp1 = getCurrentStockPrice(url, AlphaCallBack);

var AAPI = {

    GetTimeSeriesDaily: function(StockResponse, next, days) {
        let url = "https://www.alphavantage.co/query?function=\TIME_SERIES_DAILY&symbol=".concat(
            StockResponse.Ticker.concat('&outputsize=full&apikey=7KZAUZJR7I5MDRU0'));

        const StockData = https.request(url, (res) => {
            let data = '';

            //this gets called on each chunk of data
            res.on('data', (chunk) => {
                data += chunk;
            });

            // this gets called when the data has completed coming in
            res.on('end', (e) => {
                var JsonObject = JSON.parse(data);
                if (JsonObject['Error Message'] != undefined) {
                    console.log(JsonObject['Error Message']);
                }
                if (JsonObject != undefined) {
                    next(JsonObject, days);
                }
            });
        });
        StockData.end();
    },

    GetCurrentStockPrice: function(StockResponse, next, htmlRes) {

        let url = "https://www.alphavantage.co/query?function=\TIME_SERIES_DAILY&symbol=".concat(
            StockResponse.Ticker.concat('&outputsize=full&apikey=7KZAUZJR7I5MDRU0'));

        const StockData = https.request(url, (res) => {
            let data = '';

            //this gets called on each chunk of data
            res.on('data', (chunk) => {
                data += chunk;
            });

            // this gets called when the data has completed coming in
            res.on('end', (e) => {
                var JsonObject = JSON.parse(data);
                if (JsonObject['Error Message'] != undefined) {
                    console.log(JsonObject['Error Message']);
                }
                if (JsonObject != undefined) {

                    let TodaysData = 0;
                    let CurrentDate = new Date();
                    let DateString = this.Date2AapiDate(CurrentDate);
                    if (JsonObject['Time Series (Daily)'] != undefined) {
                        do {
                            TodaysData = JsonObject['Time Series (Daily)'][DateString];
                            if(TodaysData != undefined) {
                                var result = TodaysData['4. close'];

                                if(result != undefined) {
                                    StockResponse.Price = result;
                                    next(StockResponse, htmlRes);
                                } else {
                                    console.log("entering  errorstate, API call is out of date");
                                    while (1);
                                }
                            } else {
                                CurrentDate = this.GoBackOneDay(CurrentDate);
                                DateString = this.Date2AapiDate(CurrentDate);
                            }
                        } while(result == undefined); 
                    }
                } else {
                    console.log("No JSON data received");
                }
            });
        });
        //ends the communication with the API server?
        StockData.end();
    },

    GetHistoricalStockData: function(url, callback) {
        const AllData = https.request(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                var JsonObject = JSON.parse(data);
                var result = JsonObject['Time Series (Daily)'];
                if(result != undefined) {
                    callback(result);
                }
            });

            AllData.on('error', (e) => {
                console.error(e);
            });
        });
    },

    GoBackOneDay: function(date) {
        day = date.getDate()
        month = date.getMonth();
        year = date.getFullYear();

        if(day > 0) {
            day = day - 1;
        } else {

            if(month > 0) {
                month = month - 1;
                day = 32;
            } else {
                year = year - 1;
                month = 12;
            }
        }

        return new Date(year, month, day);
    },

    Date2AapiDate: function(date) {
        day = date.getDate()
        month = date.getMonth() + 1;
        year = date.getFullYear();

        var dayString = day.toString();
        var monthString = month.toString();
        if(day < 10) {
            dayString = '0' + dayString;
        } 
        if(month < 10) {
            monthString = '0' + monthString;
        } 
        return year + '-' + monthString + '-' + dayString;
    },
}

module.exports = AAPI;