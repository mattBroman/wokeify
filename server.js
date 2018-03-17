const http = require('http');
const fs = require('fs')
const express = require('express');
const app = express();
const pathHtml = 'assets/html/'


function renderHtml(route, response) {
    fs.readFile(route, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.writeHead('File not found');
        } else {
            response.write(data);
        }
        response.end();
    });
}



app.get('/', (req, res) => renderHtml(pathHtml + 'index.html', res));
app.post('/upload', (req, res) => renderHtml(pathHtml + 'pic.html', res));

app.listen(3000, () => console.log('listening on port 3000'));
