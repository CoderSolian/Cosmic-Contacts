var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  // Read the content of the HTML file
  fs.readFile('./index.html', function(err, data) {
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
