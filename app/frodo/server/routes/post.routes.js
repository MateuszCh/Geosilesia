const PostController = require('../controllers/post.controller');

module.exports = app => {
    app.post('/frodo/post', PostController.create);

    app.post('/frodo/importPosts', PostController.importPosts);

    app.get('/frodo/exportPosts/:postType', PostController.exportPosts);

    app.put('/frodo/post/edit', PostController.edit);

    app.get('/frodo/post/:id', PostController.getById);

    app.delete('/frodo/post/:id', PostController.delete);
};