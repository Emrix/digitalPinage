var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var formidable = require('formidable');
var nowShowing = 'Default'

http.listen(8080); //listen to port 8080

function handler(req, res) {
    console.log(req.url);
    switch (req) {
        //These are the forms
        case '/fileupload':
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
            break;
        case '/setShowing':
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                if (fields.vidType !== "") {
                    nowShowing = fields.vidType;
                } else {
                    nowShowing = "Default";
                }
                fs.readFile(__dirname + '/public/success.html', function(err, data) {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                        return res.end("404 Not Found");
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data); //write data from index.html
                    return res.end();
                });
            });
            break;
            //This retrieves the videos which display
        case '/getVideo':
            fs.readFile(__dirname + "/media/video.mp4", function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'video/mp4' });
                res.write(data); //write data from index.html
                return res.end();
            });
            break;
            //This serves up the video player for the actual playing of the slide show
        case '/player':
            fs.readFile(__dirname + '/public/slideshow.html', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data); //write data from index.html
                return res.end();
            });
            break;
            //These are the actual web pages that are displayed to the user
        case '/termsconditions':
            fs.readFile(__dirname + '/public/termsconditions.html', function(err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
            break;
        case '/construction':
            fs.readFile(__dirname + '/public/construction.html', function(err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
            break;
        case "/index": //Just for the index/ home page
        case '/':
        case '':
            fs.readFile(__dirname + '/public/index.html', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data); //write data from index.html
                return res.end();
            });
            break;
            //For resources
        case RegExp('/resources/*'):
            fs.readFile(__dirname + req.url, function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data); //write data from index.html
                return res.end();
            });
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
            return res.end("404 Not Found");
            break;
    }
};