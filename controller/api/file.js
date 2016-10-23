var formidable = require('formidable');
var fs = require('fs-extra');
var path = require('path');
var crypto = require('crypto');
var uuid = require('node-uuid');
var async = $.async;

// var busboy      = require('connect-busboy'),
//     streamifier = require('streamifier');
var util = require('util');
var redis = $.plug.redis.filedbserver;


module.exports.postupload = (req, res) => {
    // If no busboy req obj, then no uploads are taking place
    // if (!req.busboy)
    //     return res.send($.plug.resultformat(40001, "no uploads are taking place"));

    req.files = null;

    // req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    //     req.body = req.body || {};
    //     req.body[fieldname] = val;
    // });

    // req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //     var dataArr = [], len = 0,strBase64;
    //     var extension = path.extname(filename);

    //     // Get the base file name
    //     //var baseFilename = path.basename(request.param('filename'), extension);
    //     var baseFilename = path.basename(filename, extension);

    //     // Create the temporary file name for the chunk
    //     //var tempfilename = baseFilename + '.' + request.param('chunkNumber').toString().padLeft('0', 16) + extension + ".tmp";
    //     var tempfilename = uuid.v4() + extension; 

    //     // Create the temporary directory to store the file chunk
    //     // The temporary directory will be based on the file name
    //     //var tempdir = uploadpath + request.param('directoryname') + '/' + baseFilename;
    //     var tempdir = uploadpath + "temp";

    //     // The path to save the file chunk
    //     var localfilepath = tempdir + '/' + tempfilename;

    //     if (fs.ensureDirSync(tempdir)) {
    //         console.log('Created directory ' + tempdir);
    //     }

    //     var fileSlice = new Buffer(+req.headers['content-length']);
    //     var bufferOffset = 0;

    //     file.on("data", function (chunk){
    //         chunk.copy(fileSlice , bufferOffset);
    //         bufferOffset += chunk.length;
    //     });

    //     file.on("end", function () {
    //        var base64data = fileSlice.toString().split('\r\n');
    //        var fileData = new Buffer(base64data[4].toString(), 'base64');
    //        // Save the file and create parent directory if it does not exist
    //        fs.outputFile(localfilepath, base64data, function (err) {
    //             if (err) {
    //                 res.send($.plug.resultformat(40001, err));
    //                 return;
    //             }
    //        });
    //     });
    // });

    // req.busboy.on('finish', function(){
    //     res.send($.plug.resultformat(0, ''));
    // });
    // req.pipe(req.busboy);

    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = $.config.uploadpath;
    
    form.on('error', function (err) {
        if (err) {
            res.send($.plug.resultformat(40001, err));
            return;
        }
    });

    form.parse(req, function (err, fields, files) {
        if (err) {
          res.send($.plug.resultformat(40001, err));
          return;
        }
    });

    form.on('end', function (fields, files) {
       var array = [];
       var openfiles = form.openedFiles;

       async.each(openfiles, (item, callback) => {
           var file = item;
           var namearry = file.path.split('/');
           var key = namearry[namearry.length-1].split('.')[0];
           var value = {
                            key:key,
                            path: file.path,
                            minetype: file.type,
                            date: Date.now(),
                            name: file.name,
                            hash:""
                       };
           array.push(value);

           redis.set(key, JSON.stringify(value), (err, data) => {
               console.log(err);
           });
        },(err) => {
           console.log(err);
        });
        res.send($.plug.resultformat(0, '', array));
    });
}

module.exports.postuploadforckedit = (req, res) => {
    var CKEditorFuncNum = req.query.CKEditorFuncNum;
    var CKEditor = req.query.CKEditor;
    var script = "<script type='text/javascript'>\
                    window.parent.CKEDITOR.tools.callFunction('{0}','{1}','{2}');\
                 </script>";

    req.files = null;

    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = $.config.uploadpath;
    
    form.on('error', function (err) {
        if (err) {
            res.send(script.format(CKEditorFuncNum,'', err));
            return;
        }
    });

    form.parse(req, function (err, fields, files) {
        if (err) {
          res.send(script.format(CKEditorFuncNum,'', err));
          return;
        }
    });

    form.on('end', function (fields, files) {
       var arry=[];
       var openfiles = form.openedFiles;
       var file = openfiles[0];
       var namearry = file.path.split('/');
       var key = namearry[namearry.length-1].split('.')[0];
       var value = {
                        key:key,
                        path: file.path,
                        minetype: file.type,
                        date: Date.now(),
                        name: file.name,
                        hash:""
                   };

       redis.set(key, JSON.stringify(value), (err, data) => {
            res.send(script.format(CKEditorFuncNum, "http://172.28.184.75:8081/api/file/showforckedit?key="+key, ""));
        });
    });       
}

module.exports.postuploadforckeditpaste = (req, res) => {
    var CKEditorFuncNum = req.query.CKEditorFuncNum;
    var CKEditor = req.query.CKEditor;
    var script = "<script type='text/javascript'>\
                    window.parent.CKEDITOR.tools.callFunction('{0}','{1}','{2}');\
                 </script>";
    
    var result = {
         fileName:"",
         uploaded:1,
         url:""
    }

    req.files = null;

    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = $.config.uploadpath;
    
    form.on('error', function (err) {
        if (err) {
            res.send(script.format(CKEditorFuncNum,'', err));
            return;
        }
    });

    form.parse(req, function (err, fields, files) {
        if (err) {
          res.send(script.format(CKEditorFuncNum,'', err));
          return;
        }
    });

    form.on('end', function (fields, files) {
       var arry=[];
       var openfiles = form.openedFiles;
       var file = openfiles[0];
       var namearry = file.path.split('/');
       var key = namearry[namearry.length-1].split('.')[0];
       var value = {
                        key:key,
                        path: file.path,
                        minetype: file.type,
                        date: Date.now(),
                        name: file.name,
                        hash:""
                   };

       result.fileName = value.name;
       result.url = "http://172.28.184.75:8081/api/file/showforckedit?key="+key;

       redis.set(key, JSON.stringify(value), (err, data) => {
            res.send(result);
        });
    });       
}

// Use the post method for express.js to respond to posts to the uploadchunk urls and
// save each file chunk as a separate file
module.exports.postUploadChunk = (req, res) =>{
    // Check Content-Type    
    if (!(req.is('multipart/form-data'))) {
        response.status(415).send('Unsupported media type');
        return;
    };

    // Check that we have not exceeded the maximum chunk upload size
    var maxuploadsize = 51 * 1024 * 1024;
    
    if (req.headers['content-length'] > maxuploadsize) {
        
        response.status(413).send('Maximum upload chunk size exceeded');
        return;
    }
    
    var fileanme= "aaaa.JPG";

    // Get the extension from the file name
    //var extension = path.extname(request.param('filename'));
    var extension = path.extname(fileanme);

    // Get the base file name
    //var baseFilename = path.basename(request.param('filename'), extension);
    var baseFilename = path.basename(fileanme, extension);
    
    // Create the temporary file name for the chunk
    //var tempfilename = baseFilename + '.' + request.param('chunkNumber').toString().padLeft('0', 16) + extension + ".tmp";
    var tempfilename = uuid.v4() + extension; 

    // Create the temporary directory to store the file chunk
    // The temporary directory will be based on the file name
    //var tempdir = uploadpath + request.param('directoryname') + '/' + baseFilename;
    var tempdir = uploadpath + "temp";

    // The path to save the file chunk
    var localfilepath = tempdir + '/' + tempfilename;

    console.log(localfilepath);
    console.log(tempdir);

    if (fs.ensureDirSync(tempdir)) {
        console.log('Created directory ' + tempdir);
    }
    
    // Check if we have uploaded a hand crafted multipart/form-data request
    // If we have done so then the data is sent as a base64 string
    // and we need to extract the base64 string and save it
    if (req.headers['celerft-encoded'] === 'base64') {
        console.log(1);
        var fileSlice = new Buffer(+req.headers['content-length']);
        var bufferOffset = 0;
        
        // Get the data from the request
        req.on('data', function (chunk) {
            chunk.copy(fileSlice , bufferOffset);
            bufferOffset += chunk.length;
        
        }).on('end', function () {
            
            // Convert the data from base64 string to binary
            // base64 data in 4th indexof the array
            var base64data = fileSlice.toString().split('\r\n');
            var fileData = new Buffer(base64data[4].toString(), 'base64');
            
            // Save the file and create parent directory if it does not exist
            fs.outputFile(localfilepath, fileData, function (err) {
                
                if (err) {
                    response.status(500).send(err);
                    return;
                }
                
                // Send back a sucessful response with the file name
                response.status(200).send(localfilepath);
                response.end();
            
            });
        });
    }
    else {
         console.log(2);
        // The data is uploaded as binary data.
        // We will use formidable to extract the data and save it
        var form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = tempdir;
        
        // Parse the form and save the file chunks to the
        // default location
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.status(500).send(err);
                return;
            }
        });
        

        form.on('error', function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
        });
        
        // After the files have been saved to the temporary name
        // move them to the to the correct file name.
        // Overwrite if necessary
        form.on('end', function (fields, files) {
        // Temporary location of our uploaded file        
            var temp_path = this.openedFiles[0].path;

        // fs.move(temp_path , localfilepath, true, function (err) {
        //     if (err) {
        //         response.status(500).send(err);
        //         return;
        //     }
        //     // Send back a sucessful response with the file name
        //     response.status(200).send(localfilepath);
        //     response.end();
        // });
    
        });

    // Send back a sucessful response with the file name
    res.status(200).send(localfilepath);
    res.end();
  }
};


module.exports.getshow = (req,res) =>{
    redis.get(req.query.key ,(err, data) => {
        if(err) return res.send($.plug.resultformat(40001, err));
        if(data)
        {
            var value = JSON.parse(data);

            if(!value.path) return res.send($.plug.resultformat(40001, "No data"));

            fs.readFile(value.path,"binary",function(error,file){
                res.writeHead(200, {"Content-Type": value.minetype} );
                res.write(file,"binary");
                res.end();
            }); 
        }else 
        {
            res.send($.plug.resultformat(40001, "No data"));
        }
    });
}

module.exports.getshowforckedit = (req,res) =>{
    console.log(req.query.key.split('?')[0]);
    redis.get(req.query.key.split('?')[0],(err, data) => {
        if(err) return res.send($.plug.resultformat(40001, err));
        if(data)
        {
            var value = JSON.parse(data);

            if(!value.path) return res.send($.plug.resultformat(40001, "No data"));
            
            fs.readFile(value.path,"binary",function(error,file){
                res.writeHead(200, {"Content-Type": value.minetype} );
                res.write(file,"binary");
                res.end();
            }); 
        }else
        {
            res.send($.plug.resultformat(40001, "No data"));
        }
    });
}

module.exports.postallfileinfo = (req , res) => {
    var keys = req.body;
    var values = [];

    async.each(keys, (id, callback) => {
        async.waterfall([
            function (cb) {
                redis.get(id , function (err, data){
                    return cb(null, data);
                });
            },
            function (data,cb) {
               values.push(data);
               cb();
            }
        ],
        function (err, data) {
            callback();   
        });
     },(err,data)=> {
        res.send($.plug.resultformat(0, '',values));
    });
}

// Request to merge all of the file chunks into one file
module.exports.getMergeAll = (request, response) => {

    if (request.method === 'GET') {
        
        // Get the extension from the file name
        var extension = path.extname(request.param('filename'));
        
        // Get the base file name
        var baseFilename = path.basename(request.param('filename'), extension);
        
        var localFilePath = uploadpath + request.param('directoryname') + '/' + baseFilename;

        // Check if all of the file chunks have be uploaded
        // Note we only wnat the files with a *.tmp extension
        var files = getfilesWithExtensionName(localFilePath, 'tmp')
        
        if ((typeof files == "undefined") || (files.length != request.param('numberOfChunks'))) {
            
            response.status(400).send('Number of file chunks less than total count');
            return;
        }
        
        var filename = localFilePath + '/' + baseFilename + extension;
        var outputFile = fs.createWriteStream(filename);
        
        // Done writing the file
        // Create the MD5 hash and then move to top level directory

        outputFile.on('finish', function () {

            console.log('file has been written ' + filename);
            
            // Create MD5 hash
            var hash = crypto.createHash('md5'), 
                hashstream = fs.createReadStream(filename);
            
            hashstream.on('data', function (data) {
                hash.update(data)
            });
            
            hashstream.on('end', function () {
                
                var md5results = hash.digest('hex');
                
                // Rename the file and move it to the top level directory
                
                // New name for the file
                var newfilename = uploadpath + request.param('directoryname') + '/' + baseFilename + extension;
                
                // Check if file exists at top level if it does delete it
                // Use move with overwrite option
                fs.move(filename, newfilename , true, function (err) {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    else {
                        
                        // Delete the temporary directory
                        fs.remove(localFilePath, function (err) {
                            
                            if (err) {
                                response.status(500).send(err);
                                return;
                            }
                            
                            // Send back a sucessful response with the file name
                            response.status(200).send('Sucessfully merged file ' + filename + ", " + md5results.toUpperCase());
                            response.end();
                        
                        });

                        // Send back a sucessful response with the file name
                        //response.status(200).send('Sucessfully merged file ' + filename + ", " + md5results.toUpperCase());
                        //response.end();
                    
                    }
                });
   
            });
            
        });
        
        // Loop through the file chunks and write them to the file
        // files[index] retunrs the name of the file.
        // we need to add put in the full path to the file
        for (var index in files) {
            
            console.log(files[index]);
            var data = fs.readFileSync(localFilePath + '/' + files[index]);
            outputFile.write(data);
            fs.removeSync(localFilePath + '/' + files[index]);
        }

        outputFile.end();  
    }
};

// String padding left code taken from 
// http://www.lm-tech.it/Blog/post/2012/12/01/String-Padding-in-Javascript.aspx

String.prototype.padLeft = function (paddingChar, length) {
    var s = new String(this);
    if ((this.length < length) && (paddingChar.toString().length > 0)) {
        for (var i = 0; i < (length - this.length) ; i++) {
            s = paddingChar.toString().charAt(0).concat(s);
        }
    }
    
    return s;
};


// Get files with a give extension. Based on StackOverflow answer
function getfilesWithExtensionName(dir, ext) {
    
    var matchingfiles = [];
    
    if (fs.ensureDirSync(dir)) {
        return matchingfiles;
    }

    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        if (path.extname(files[i]) === '.' + ext) {
            matchingfiles.push(files[i]);
        }
    }

    return matchingfiles;
}