const http = require('http');
const fs = require('fs')
const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
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

app.use(bodyParser({uploadDir:'./uploads'}));

app.get('/', (req, res) => renderHtml(pathHtml + 'index.html', res));

app.post('/upload', function(req, res) {
    let tempPath = req.files.file.path;
    let targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name.toLowerCase() === '.png')) {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log('upload completed!');
        });
    } else {
        fs.unlink(tempPath, function() {
            if (err) throw err;
            console.error('pngs only');
        }); 
    }
    renderHtml(pathHtml + 'pic.html', res);
});

app.listen(3000, () => console.log('listening on port 3000'));
