var mysql = require('mysql');
var path = require('path');
var fs = require('fs');
var queryResult;
var query;
var queryType;
var skillTypeQuery = "Select * from skilltype";
var skillQuery = "Select * from skill";
var experienceQuery = "Select * from experience";
var experienceDetailQuery = "Select * from experiencenote";
var educationQuery = "Select * from education";
var nameQuery = "Select first, middle, last from name";
var addressQuery = "Select streetNum, streetName, city, state, country, zip,"+
" phone from address";

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'xxxx',
  password: 'xxxx',
  database: 'xxxx',
  port: '3306'
});

function server(args) {
  var http = require('http');
  var localFolder = args[2];
  var ip = args[3];
  var port = args[4];

  this.connectSQL = function() {
    connection.connect();
  };

  connectSQL();
  http.createServer(function(req, res) {
    var content = '',
    fileName = path.basename(req.url);
    console.log(req.url.toString());
    console.log(req.connection.remoteAddress);
    if (req.method === 'POST') {
      req.on('data', function(data) {
        queryType = data.toString("utf8").split("=")[1];
        resumeDBHandler(queryType);
        console.log(query);
        connection.query(query, function(err, rows, fields) {
          if (!err) {
            console.log(JSON.stringify(rows[0]));
            res.writeHead(200, {
              'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(rows), 'utf8');
            queryResult = rows;
          } else
            console.log('Error while performing DB Query.');
        });

      });
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      if (fileName === 'index.html' || fileName === '') {
        fileName = 'index.html';
        content = localFolder + fileName;
        console.log(content);
        fs.readFile(content, function(err, contents) {
          if (!err) {
            res.end(contents);
          } else {
            console.dir(err);
          }
        });
      } else {
        content = localFolder + req.url;
        console.log(content);
        fs.readFile(content, function(err, contents) {
          if (!err) {
            res.end(contents);
          } else {
            console.dir(err);
          }
        });
      }
    }

  }).listen(Number(port), ip);
}

function resumeDBHandler(qType) {
  if (qType === "experience") {
    query = experienceQuery;
  } else if (qType === "expDetail") {
    query = experienceDetailQuery;
  } else if (qType === "education") {
    query = educationQuery;
  } else if (qType === "address") {
    query = addressQuery;
  } else if (qType === "name") {
    query = nameQuery;
  } else if (qType === "skillTypes") {
    query = skillTypeQuery;
  } else if (qType === "skills") {
    query = skillQuery;
  }
}

function queryDB() {}

server(process.argv);
resumeDBHandler("name");
