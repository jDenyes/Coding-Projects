var express = require("express");


var app = express();
app.set('view engine', 'ejs');

app.listen(5000);

app.get('/', function(req, res) {
    res.render('about');
});

// app.get('*', function(req, res) {
//     res.render('error');
// });

