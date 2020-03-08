

// const options = {
//     hostname    : 'https://www.alphavantage.co',
//     port        : null,
//     path        : '/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo',
//     method      : 'GET'
// };

// const url = 
// var temp1 = getCurrentStockPrice(url, AlphaCallBack);

var AAPI = {
    GetCurrentStockPrice: function(url, next, htmlRes) {
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
                    let TodaysData = 0;
                    let CurrentDate = new Date();
                    let DateString = this.Date2AapiDate(CurrentDate);
                    
                    do {
                        TodaysData = JsonObject['Time Series (Daily)'][DateString];
                        if(TodaysData != undefined) {
                            var result = TodaysData['4. close'];

                            if(result != undefined) {
                                next(result, htmlRes);
                            } else {
                                console.log("entering  errorstate, API call is out of date");
                                while(1);
                            }
                        } else {
                            CurrentDate = this.GoBackOneDay(CurrentDate);
                            DateString = this.Date2AapiDate(CurrentDate);
                            console.log(DateString);
                        }
                    } while(result == undefined); 

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

    //only used for debug purposes
    AlphaCallBack: function(thisData) {
        console.log(thisData);
    },

    GoBackOneDay: function(date) {
        day = date.getDate()
        month = date.getMonth();
        year = date.getFullYear();

        if(day > 1) {
            day = day - 1;
        } else {
            if(month > 1) {
                month = month - 1;
            } else {
                year = year - 1;
            }
        }
        return new Date(year, month, day);
    },

    // GetTodaysDate: function() {
    //     let CurrentDate = new Date(); 
    //     // day = CurrentDate.getDate();
    //     // month = CurrentDate.getMonth() +1;
    //     // year = CurrentDate.getFullYear();
    //     // return new Date(day, month, year);
    //     return this.calculateDateString(day, month, year);
    // },

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

// AllData.end();

module.exports = AAPI;