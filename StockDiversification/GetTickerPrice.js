const AAPI = require('./AAPI.js');
const res = "NULL"
const fs = require('fs')

StockResponse = {
    "Ticker" : " ",
    "Quantity" : 1, // req.body.Quantity,
    "Price" : 0,
};

StockInput = {
    "Ticker" : " ",
    "Quantity" : 1, // req.body.Quantity,
    "Price" : 0,
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function next(data, days) {


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
}

function GetMovingAverage(days) {
    readline.question('Enter a ticker:\t', stock => {
        StockInput.Ticker = stock
        readline.close();

        TimeSeries = null;
        AAPI.GetTimeSeriesDaily(StockInput, next, days);
    });
}

// Gets the 50 day moving average of a stock
GetMovingAverage(50);

// GetInputStockPrice();
// Out putStockDataToFile("MSFT", "test.txt")