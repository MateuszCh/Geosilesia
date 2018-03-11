const multer = require('multer'),
      File = require('../models/file'),
      path = require('path'),
      Counter = require('../models/counter'),
      fs = require('fs');

const storage = multer.diskStorage({
   destination: function(req, file, cb){
	   cb(null, `${__dirname}/../../../uploads/`);
   },
   filename: function(req, file, cb){
	   cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
   }
});

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Wrong file type');
    }
}

module.exports = {
    upload: multer({
        storage: storage,
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        },
        limits: {fileSize: 10000000}
    }),
    create(req, res, next){
        const files = req.files;
        const filesProps = req.body.filesData || [];
        const fileModels = [];

        Counter.findOne({})
            .then(counter => {

                files.forEach((file, i) => {
                    const model = {
                        filename : file.filename,
                        created : Date.now(),
                        type : file.mimetype,
                        id: counter.counter + i
                    };

                    const fileProps = filesProps[i];

                    for(let prop in fileProps){
                        if(fileProps[prop]){
                            if(prop == 'catalogue'){
                                model[prop] = fileProps[prop].toLowerCase();
                            } else {
                                model[prop] = fileProps[prop];
                            }
                        }
                    }

                    fileModels.push(model);
                });

                File.create(fileModels)
                    .then((files) => {
                        res.send(files);
                        Counter.update(counter, {$inc: {counter: files.length}})
                            .then(() => console.log("Counter incremented"))
                            .catch(next);
                    })
                    .catch(next);

            })
            .catch(next);

    },
    getAll(req, res, next){
        File.find({})
            .then(files => res.send(files))
            .catch(next)
    },
    getAllImages(req, res, next){
        File.find({type: /^image/})
            .then(images => res.send(images))
            .catch(next)
    },
    getAllPdfs(req, res, next){
        File.find({type: 'application/pdf'})
            .then(pdfs => res.send(pdfs))
            .catch(next);
    },
    deleteOne(req, res, next){
        File.findByIdAndRemove(req.params.id)
            .then(file => {
                if(file){
                    console.log(file);
                    fs.unlink(`${__dirname}/../../../uploads/${file.filename}`, (err) => {
                        if(err) next();
                        res.status(200).send('File removed successfully');
                    });
                } else {
                    res.status(422).send('There is no file to remove');
                }

            })
            .catch(next);
    }
};