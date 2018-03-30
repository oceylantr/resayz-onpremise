var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler());

app.post('/upload/:filename', function (req, res) {
  var filename = path.basename(req.params.filename);
  filename = path.resolve(__dirname, filename);
  var dst = fs.createWriteStream(filename);
  req.pipe(dst);
  dst.on('drain', function() {
    console.log('drain', new Date());
    req.resume();
  });
  req.on('end', function () {
    res.send(200);
  });
});

app.get('/getthecat', function (req, res) {
  var catpath = path.resolve(__dirname, "cropped.jpg");

  fs.readFile(catpath, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200,{'Content-type':'image/jpeg'});
            res.end(content, 'binary');
        }
    });

  //res.writeHead(200,{'Content-type':'image/jpeg'});
  //res.end(catpath);
  //res.send('<img src="' + catpath + '"></img>');
  //res.contentType('image/jpeg');
  //res.end(catpath, 'binary');
  //res.send(path.resolve(__dirname, "cropped.jpg"));
})

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});