var dns = require('native-dns');
var server = dns.createServer('udp4');
var express = require('express');

var app = express.createServer();

var entries = {};

server.bind(15353);

server.on('request', function (request, response) {
  var name = request.question[0].name;
  console.log(name);

  response.answer.push(dns.A(entries[name]));
  response.send();
});

server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

app.use(express.bodyParser());

app.post('/', function(req, res){
  var e = req.body;
  console.log(e);

  var entry = {};
  entry.address = e.data;
  entry.name = e.name;
  entry.ttl = e.ttl;

  entries[e["name"]] = entry;

  console.log("New entry: " + entry);
  res.json({ 'status': 'success'});
});

app.listen(3002);
