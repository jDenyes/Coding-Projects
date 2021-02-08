const https = require('https');
const fs = require('fs');
// const options = {
//     hostname    : 'https://www.alphavantage.co',
//     port        : null,
//     path        : '/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo',
//     method      : 'GET'
// };

// const url = 
// var temp1 = getCurrentStockPrice(url, AlphaCallBack);

var AAPI = {

    //initial call
    //Every Function gets called through here, is this reduntant?
    // 1. ApiCall indicates which APi Call function to call
    // 2. Callback references which reference function 
    MakeApiCall: function(ApiCall, CallBack, ticker, param) {
        StockResponse = {
            "Ticker" : ticker,
            "Quantity" : 0,
            "Price" : 0,
        };

        ApiCall(StockResponse, CallBack, param);
    },

    // gets latest information
    GetLatestInformation: function(data, param) {
        let TodaysData = 0;
        let CurrentDate = new Date();
        let DateString = AAPI.Date2AapiDate(CurrentDate);
        if (data['Time Series (Daily)'] != undefined) {
            do {
                TodaysData = data['Time Series (Daily)'][DateString];
                if(TodaysData != undefined) {
                    console.log(TodaysData);
                    console.log("\n");
                } else {
                    CurrentDate = AAPI.GoBackOneDay(CurrentDate);
                    DateString = AAPI.Date2AapiDate(CurrentDate);
                }
            } while(TodaysData == undefined); 
        }
        return TodaysData;
    },

    // Gets the most recent close price of a stock from the latest Time Series Entry
    GetCurrentStockPrice: function(data, param) {
        let TodaysData = AAPI.GetLatestInformation(data);
        let closing = TodaysData['4. close'];
        console.log(closing);
        return closing;
    },

    // Grabs moving average for the past 200 days from a stock
    GetMovingAverage: function(data, days) {
        let TodaysData = 0;
        let CurrentDate = new Date();
        let DateString = AAPI.Date2AapiDate(CurrentDate);
    
        if (data['Time Series (Daily)'] != undefined) {
    
            var totalPrice = 0;
            var numDays = days;
            var averagePrice = 0;
    
            while (numDays > 0) {
                TodaysData = data['Time Series (Daily)'][DateString];
    
                if(TodaysData != undefined) {
                    var result = TodaysData['4. close'];
                    if (result != undefined) {
                        totalPrice += parseFloat(result);
                        numDays -= 1;
                    }
                } 
                CurrentDate = AAPI.GoBackOneDay(CurrentDate);
                DateString = AAPI.Date2AapiDate(CurrentDate);
            }
            var averagePrice = totalPrice / days;
            var averagePriceRounded = Math.round(averagePrice * 100) / 100;
            console.log(`The 50 day moving average is ${averagePriceRounded}`);
        }
    },

    ShowDiversification: function() {
        fs.readFile('Tickers.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let splitData = data.split("\n");
        });
    },

    // writes Prices of tickers from Tickers.txt to TickerPrices.txt
    UpdateTickerValues: function(data, line) {
        price = AAPI.GetCurrentStockPrice(data);

        if (line == 1) {
            fs.writeFile("TickerPrices.txt", price + "\n", null, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("File written succesfully");                                       
                }
            });
        } else {
            fs.appendFile("TickerPrices.txt", price + "\n", null, (err) => {
                if (err) {
                    throw err;
                }
                console.log("appended data to the file");
            });
        }
    },

    // For reading ticker file
    ReadTickers: function() {
        // 1. Read from file to get stocks to update
        fs.readFile('Tickers.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);
            let splitData_byLine = data.split("\n");
            console.log(splitData_byLine);

            let tickers = [];
            let quantities = [];

            for (var i = 1; i < splitData_byLine.length; i++) {
                console.log(splitData_byLine[i]);
                let splitLine = splitData_byLine[i].split(", ");

                let ticker = splitLine[0];
                let quantity = splitLine[1];

                tickers.push(splitLine[0]);
                quantities.push(splitLine[1]);

                this.MakeApiCall(AAPI.GetTimeSeriesDaily, AAPI.UpdateTickerValues, ticker, i);
            }

            return [tickers, quantities];

        });
        // Grab the price of each stock

        // Write it back to diversification file
    },

    //API call
    GetTimeSeriesDaily: function(StockResponse, next, param) {
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
                    next(JsonObject, param);
                }
            });
        });
        StockData.end();
    },

    // GetHistoricalStockData: function(url, callback) {
    //     const AllData = https.request(url, (res) => {
    //         let data = '';

    //         res.on('data', (chunk) => {
    //             data += chunk;
    //         });

    //         res.on('end', () => {
    //             var JsonObject = JSON.parse(data);
    //             var result = JsonObject['Time Series (Daily)'];
    //             if(result != undefined) {
    //                 callback(result);
    //             }
    //         });

    //         AllData.on('error', (e) => {
    //             console.error(e);
    //         });
    //     });
    // },

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