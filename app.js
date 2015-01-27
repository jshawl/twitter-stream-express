var Twit = require('twit');
 var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
});

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  var stream = T.stream('statuses/filter', { track: 'happy' })
  stream.on('tweet', function (tweet) {
    io.sockets.emit('stream',tweet.text);
  });
});

server.listen(4000);