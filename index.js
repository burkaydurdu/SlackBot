var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){ res.status(200).send("Hello Frindly")});

app.listen(port, function() {
    console.log("Listening on port " + port);
})

app.post('/hello', function(req, res, next) {
    var userName = req.body.user_name;
    var botPayLoad = {
        text: 'Hello ' + userName + ', wellcome to the Developer Team Slack channel! Have fun :)'
    };

    if(userName !== 'slackbot') {
        return res.status(200).json(botPayLoad);
    } else {
        return res.status(200).end();
    }
})