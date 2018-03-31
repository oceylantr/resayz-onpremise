var http = require('http');
var fs = require('fs');
var ImageJS = require("imagejs");
var request = require("request");
var path = require('path');

exports.handler = function(context, event) {

	var request2 = http.get("http://3.bp.blogspot.com/-sqSKVvNUFkU/U-nopbRhYlI/AAAAAAAANPg/_P7lU81GdDY/s1600/kedi-beslemek-isteyenler-icin-tavsiyeler.jpg", function(response) {
  	//response.pipe(file);

	var bitmap = new ImageJS.Bitmap();
	bitmap.read(response, { type: ImageJS.ImageType.JPG })
	    .then(function() {
	        // bitmap is ready
	        var thumbnail = bitmap.resize({
			    width: 300, height: 300 * (bitmap.height / bitmap.width),
			    algorithm: "nearestNeighbor",
			    fit: "pad"
			});

			thumbnail.writeFile("cropped.jpg", { quality:100 })
		    .then(function() {
		        // bitmap has been saved

			  	fs.readFile("cropped.jpg", function (err, content) {
			        if (err) {
			            console.log(err);
			            res.end("No such image");    
			        } else {
			            //specify the content type in the response will be an image
			            request.post({
						  headers: {'content-type' : 'image/jpeg'},
						  url:     'http://172.17.0.3:3000/upload/cropped.jpg',
						  body:    content
						}, function(error, response, body){
						  console.log(body);
						});
			        }
			    });

		       
		    });


	    });

	});
	context.callback("success");

};
