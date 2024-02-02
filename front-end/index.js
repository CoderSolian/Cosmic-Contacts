var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  // Extract the file name from the request URL
  var fileName = req.url === '/' ? 'index.html' : req.url;
  // Construct the file path
  var filePath = path.join(__dirname, fileName);
  
  // Read the content of the requested file
  fs.readFile(filePath, function(err, data) {
    if (err) {
      // Handle error, such as file not found
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('404 Not Found');
    } else {
      // Serve the HTML content
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}).listen(8080);
