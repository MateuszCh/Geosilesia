const FileController = require('../controllers/file.controller');

module.exports = app => {

    app.post('/frodo/file', FileController.upload.array('files'), FileController.create);

    app.put('/frodo/file/', FileController.edit);

    app.get('/frodo/file', FileController.getAll);

    app.get('/frodo/file/catalogues', FileController.getCatalogues);

    app.get('/frodo/file/:catalogue', FileController.getByCatalogue);

    app.get('/frodo/file/images', FileController.getAllImages);

    app.get('/frodo/file/pdfs', FileController.getAllPdfs);

    app.delete('/frodo/file/:id', FileController.delete);

};