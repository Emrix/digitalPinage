var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var formidable = require('formidable');
var displayType = 'online';

http.listen(8080); //listen to port 8080

function handler(req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = (__dirname + '/media/video.mp4');
            fs.rename(oldpath, newpath, function(err) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.write('<a href = "/">Back</a>');
                    return res.end("Unable to upload file");
                } else {
                    fs.readFile(__dirname + '/public/success.html', function(err, data) {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                            return res.end("404 Not Found");
                        }
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data); //write data from index.html
                        return res.end();
                    });
                }
            });
        });
    } else if (req.url == '/setType') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            displayType = fields.vidType
            fs.readFile(__dirname + '/public/index.html', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data); //write data from index.html
                res.write(displayType);
                return res.end();
            });
        });
    } else if (req.url == '/ajax_info.txt') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(displayType); //write data from index.html
        return res.end();
    } else if (req.url == '/player') {
        if (displayType === 'Online') {
            fs.readFile(__dirname + '/public/youtube.html', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data); //write data from index.html
                return res.end();
            });

        } else if (displayType === 'Local') {
            fs.readFile(__dirname + '/public/localVideo.html', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data); //write data from index.html
                return res.end();
            });
        } else { //It's a slide show
            fs.readFile(__dirname + '/public/slideshow.html', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data); //write data from index.html
                return res.end();
            });
        }
    } else if (req.url == '/getVideo') {
        fs.readFile(__dirname + "/media/video.mp4", function(err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'video/mp4' });
            res.write(data); //write data from index.html
            return res.end();
        });
    } else {
        fs.readFile(__dirname + '/public/index.html', function(err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data); //write data from index.html
            res.write(displayType);
            return res.end();
        });
    }
};