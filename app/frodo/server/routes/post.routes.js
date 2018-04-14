const PostController = require('../controllers/post.controller');

module.exports = app => {
    app.post('/frodo/post', PostController.create);

    app.post('/frodo/import', PostController.import);

    app.put('/frodo/post/edit', PostController.edit);

    app.get('/frodo/post/:id', PostController.getById);

    app.delete('/frodo/post/:id', PostController.delete);
};