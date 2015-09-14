var crud_modules = require('./server_modules/db/crud_modules');
var server_modules = require('./server_modules/home_page');
var http = require('http');
var path = require('path');
var socket_io = require('socket.io');
var exp = require('express');

var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var objectID = require('mongodb').objectID;
var connectUrl = 'mongodb://127.0.0.1:27017/jira';

var server = exp();

server.set('port', '8080');
server.set('views', path.join(__dirname, 'server_templates'));
server.set('view engine', 'jade');
server.use(exp.static(path.join(__dirname, 'server_static')));

server.get('/', server_modules.login);
server.get('/main', server_modules.main_page);
server.get('/stats', server_modules.stats);

var http_server = http.createServer(server)
var io_socket = socket_io(http_server)

http_server.listen(
  server.get('port'),
  function(){
    console.log('Http server listening on port ' + server.get('port'));
  }
);

io_socket.on(
  'connection',
  function(socket){
    console.log('User Connected');
    socket.on(
      'comm',
      function(message){
        socket.broadcast.emit('comm', message);
      }
    );
    socket.on(
      'teamDate',
      function(message){
        console.log(message);

        if(message.team=='PSI')
          var id="1"
        else
          var id="2"

        crud_modules.read(connectUrl, mongoClient, assert, 'tickets', {'idu': id},
          function(document){

            var values = [['Task', 'Hours per Day']]
            for(i=0;i<document.values.length;i++)
              values.push([document.values[i].header,  document.values[i].value])

            console.log(values)
            socket.emit('teamDate', {'filters' : message, 'value' : values });
          }
        );
      }
    );
  }
);