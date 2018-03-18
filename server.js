const http = require('http');
const fs = require('fs')
const express = require('express');
const app = express();
const path = require('path')
const busboy = require('connect-busboy');
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

app.use(busboy());

app.get('/', (req, res) => renderHtml(pathHtml + 'index.html', res));

app.get('/uploads/:name', function(req, res) {
    let name = req.params.name;
    res.sendfile('./uploads/' + name);
});

app.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(feildname, file, filename) {
        console.log('uploading');
        fstream = fs.createWriteStream('./uploads/' + 'image.png');
        file.pipe(fstream);
    });
    req.busboy.on('finish', function() {
        console.log('uploaded');
    });
    renderHtml(pathHtml + 'pic.html', res);
});
    
    /*
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
*/

app.listen(3000, () => console.log('listening on port 3000'));
