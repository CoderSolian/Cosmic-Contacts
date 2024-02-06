const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  // finds landing page and appends pages to redirects
  if (filePath === './') {
    filePath = './pages/login.html';
  }else if(path.extname(filePath) === '.html'){
    filePath = './pages/' + filePath
  }
 
  // Read the file and serve it
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('File not found!');
      } else {
        // Other server error
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
    } else {
      // Determine the content type based on file extension
      const extname = path.extname(filePath);
      let contentType = 'text/html';
      if (extname === '.css') {
        contentType = 'text/css';
      }

      // Serve the file with appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Define the port
const port =  8080;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
