const CustomPostController = require('../controllers/customPost.controller');

module.exports = (app) => {

    app.post('/frodo/customPost', CustomPostController.create);

    app.delete('/frodo/customPost/:id', CustomPostController.delete);

    app.get('/frodo/customPost/:id', CustomPostController.getById);

    app.put('/frodo/customPost/edit/:id', CustomPostController.edit);

};