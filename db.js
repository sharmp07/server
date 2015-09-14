
var crud_modules = require('./server_modules/db/crud_modules');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var objectID = require('mongodb').objectID;
var connectUrl = 'mongodb://127.0.0.1:27017/jira';

var http_write = require('http');
var exp_write = require('express');

var server_write = exp_write();
server_write.set('port', '8081');

server_write.get('/create', function(req, res) {crud_modules.create(connectUrl, mongoClient, assert, 'tickets', {'idu': req.query.id, 'values': [{'header' : 'value1', 'value' : 30 }, {'header' : 'value2', 'value' : 40}]}); res.send('Operation completed');});
server_write.get('/update', function(req, res) {crud_modules.update(connectUrl, mongoClient, assert, 'tickets', {'idu': "1"}, { 'idu': "1", 'values': [{'header' : 'value1', 'value' : 30 }, {'header' : 'value2', 'value' : 40}, {'header' : 'value3', 'value' : 50}]}); res.send('Operation completed');});
server_write.get('/delete', function(req, res) {crud_modules.deletes(connectUrl, mongoClient, assert, 'tickets', {'idu': "1"}); res.send('Operation completed');});

var http_server_write = http_write.createServer(server_write)
http_server_write.listen(
  server_write.get('port'),
  function(){
    console.log('Http Write server listening on port ' + server_write.get('port'));
  }
);

