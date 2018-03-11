const FileController = require('../controllers/file.controller');

module.exports = app => {

    // app.post('/frodo/file', FileController.upload.single('file'), FileController.create);

    app.post('/frodo/file', FileController.upload.array('files'), FileController.create);

    app.get('/frodo/file', FileController.getAll);

    app.get('/frodo/file/images', FileController.getAllImages);

    app.get('/frodo/file/pdfs', FileController.getAllPdfs);

    app.delete('/frodo/file/:id', FileController.deleteOne);

};