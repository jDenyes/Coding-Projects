

// const options = {
//     hostname    : 'https://www.alphavantage.co',
//     port        : null,
//     path        : '/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo',
//     method      : 'GET'
// };

// const url = 
// var temp1 = getCurrentStockPrice(url, AlphaCallBack);


var AAPI = {
    GetCurrentStockPrice: function(url, callback) {
        const https = require('https');
        // const request   = require('request');

        const StockData = https.request(url, (res) => {
            let data = '';

            //this gets called on each chunk of data
            res.on('data', (chunk) => {
                data += chunk;
            });

            // this gets called when the data has completed coming in
            res.on('end', (e) => {
                var JsonObject = JSON.parse(data);
                if(JsonObject['Error Message'] != undefined) {
                    console.log(JsonObject['Error Message']);
                }
                if(JsonObject != undefined) {
                    // console.log(JsonObject);
                    let CurrentDate = this.GetTodaysDate();
                    // console.log(JsonObject['Time Series (Daily)']);
                    let TodaysData = JsonObject['Time Series (Daily)'][CurrentDate];

                    do {
                        
                        if(TodaysData != undefined) {
                            var result = TodaysData['4. close'];

                            if(result != undefined) {
                                callback(result);
                            } else {
                                console.log("entering error state");
                                console.log("Invalid Input");
                            }
                        }

                    } (while )



                } else {
                    console.log("Invalid Input");
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

            // var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 13];

            res.on('end', () => {
                var JsonObject = JSON.parse(data);
                // var Date = '';
                // var year = '2019';
                // for(var month = 1; month < 13; month++) {
                // for(var day = 1; day < daysInMonth[month - 1] + 1; day++) {
                // Date = calculateDateString(day, month, year);
                var result = JsonObject['Time Series (Daily)'];
                if(result != undefined) {
                    callback(result);
                }
                // }
            });

            AllData.on('error', (e) => {
                console.error(e);
            });
        });
    },

    AlphaCallBack: function(thisData) {
        console.log(thisData);
    },

    GoBackOneDay: function(day, month, year) {
        if(day > 1) {
            day = day - 1;
        } else {
            if(month > 1) {
                month = month - 1;
            } else {
                year = year - 1;
            }
        }
        return this.calculateDateString(day, month, year);
    },

    GetTodaysDate: function() {
        let CurrentDate = new Date(); 
        day = CurrentDate.getDate();
        month = CurrentDate.getMonth() +1;
        year = CurrentDate.getFullYear();
        return this.calculateDateString(day, month, year);
    },

    calculateDateString: function(day, month, year) {
        var dayString = day.toString();
        var monthString = month.toString();
        if(day < 10) {
            dayString = '0' + dayString;
        } 
        if(month < 10) {
            monthString = '0' + monthString;
        } 
        return year + '-' + monthString + '-' + dayString;
    }
}

// AllData.end();

module.exports = AAPI;