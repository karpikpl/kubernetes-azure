'use strict';
const appInsights = require('applicationinsights');
appInsights.setup();
appInsights.start();

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    os = require("os"),
    port = process.argv[2] || 8080;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  if(uri === '/api/random') {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Guaranteed Random Number: 4" + "\n");
        response.write("\n\n\nHostname: " + os.hostname() + "\n");
        response.end();
        return;
  }

  if(uri === '/api/slowrandom') {
        setTimeout( () => {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("Guaranteed Random Number: 5" + "\n");
            response.write("\n\n\nHostname: " + os.hostname() + "\n");
            response.end();
        },5000);
    return;
  }

  if(uri === '/api/version') {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Version: 1.1.1.2\n");
    response.write("Build: #{Build.BuildId}#\n");
    response.end();
    return;
  }

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
