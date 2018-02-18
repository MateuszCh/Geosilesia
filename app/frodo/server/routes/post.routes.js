const PostController = require('../controllers/post.controller');

module.exports = app => {
    app.post('/frodo/post', PostController.create);

    app.put('/frodo/post/edit/:id', PostController.edit);

    app.get('/frodo/post/:id', PostController.getById);

    app.delete('/frodo/post/:id', PostController.delete);
};