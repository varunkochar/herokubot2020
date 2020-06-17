var express = require("express");
var bodyParser = require("body-parser");
var chat = require("./libs/hangout-chat.js");

var app = express();

var port = process.env.PORT || 851;
var https_port = process.env.HTTPS_PORT || parseInt(port) + 1;

var jsonParser = bodyParser.json();
var googleRequest;
app.get("/", function(req, res) {
  console.log("req = " + req.body);
  console.log("res = " + res.body);
  console.log("inside get " );
  res.send("Nothing chek try printing. "+ JSON.stringify(res.body));
});

// Change the URL to an individual AND hard to guess URL
// https://developers.google.com/hangouts/chat/how-tos/bots-develop#registering_the_bot
app.post("/ThisIsMyHardToGuessUrl", jsonParser, function(req, res) {
  console.log("inside post " );
  console.log("Google hangout Message "+JSON.stringify(req.body));
  googleRequest = JSON.stringify(req.body);
  //if (chat.securityCheck(req, res)) {
    chat.processChat(req.body, res);
  //}
});

app.listen(port, function() {
  console.log("Example bot listening on " + port);
});
